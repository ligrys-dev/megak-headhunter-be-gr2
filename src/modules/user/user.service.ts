import {
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import {
  Role,
  UserFromReq,
  UserWithRandomPwd as UserWithRandomPwd,
} from 'src/types';
import { hashPwd } from 'src/utils/handle-pwd';
import { generateRandomPwd } from 'src/utils/generate-random-pwd';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MailService } from 'src/common/mail/mail.service';
import { CreateHrRecruiterDto } from '../hr-recruiter/dto/create-hr-recruiter.dto';
import { HrRecruiterService } from '../hr-recruiter/hr-recruiter.service';
import { StudentService } from '../student/student.service';
import { CreateStudentInitialDto } from '../student/dto/create-studentInitial.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private mailService: MailService,
    private hrRecruiterService: HrRecruiterService,
    private studentService: StudentService,
  ) {}

  async findOneByEmail(email: string) {
    return await User.findOneBy({ email });
  }

  async findOneById(id: string) {
    return await User.findOneBy({ id });
  }

  async createStudents(createStudentDtos: CreateStudentInitialDto[]) {
    const createdUsers: UserWithRandomPwd[] = [];
    const successfulEmails: string[] = [];
    const failedEmails: { email: string; errorDetails: string[] }[] = [];

    try {
      for (const createStudentDto of createStudentDtos) {
        const validation = await this.validateStudentInital(createStudentDto);

        if (!validation.isValid) {
          failedEmails.push({
            email: createStudentDto.email,
            errorDetails: validation.errorDetails,
          });
          continue;
        }

        const isExisted = await this.findOneByEmail(createStudentDto.email);
        if (isExisted) {
          failedEmails.push({
            email: createStudentDto.email,
            errorDetails: ['User already exists.'],
          });
          continue;
        }

        const password = generateRandomPwd();

        const newUser = new User();
        newUser.email = createStudentDto.email;
        newUser.role = Role.STUDENT;
        newUser.pwdHash = await hashPwd(password);
        await newUser.save();

        createdUsers.push({ newUser, password });

        await this.studentService.createInitialProfile(createStudentDto);

        successfulEmails.push(createStudentDto.email);
      }
      await this.cacheManager.set('users-to-activate', createdUsers);

      console.error(failedEmails);

      return {
        successfulEmails,
        failedEmails,
      };
    } catch (e) {
      if (e instanceof HttpException) throw e;
      throw new Error(e);
    }
  }

  async createRecruiter(createRecruiterDto: CreateHrRecruiterDto) {
    const createdUsers: UserWithRandomPwd[] = [];

    const password = generateRandomPwd();

    const newUser = new User();
    newUser.email = createRecruiterDto.email;
    newUser.role = Role.HR;
    newUser.pwdHash = await hashPwd(password);
    await newUser.save();

    createdUsers.push({ newUser, password });
    await this.cacheManager.set('users-to-activate', createdUsers);

    return await this.hrRecruiterService.create(createRecruiterDto);
  }

  async sendActivationMail(users: UserWithRandomPwd[]) {
    for await (const user of users) {
      const { email, id, activationToken } = user.newUser;
      await this.mailService.sendMail(
        email,
        'headhunter-app account activation',
        `<p>Aby aktywowac swoje konto, kliknij ponizszy link:</p>
        <a href="http://localhost:3001/user/activate/${id}/${activationToken}">
          http://localhost:3001/user/activate/${id}/${activationToken}</a>
        <p>Twoje tymczasowe haslo: <strong>${user.password}</strong></p>
        <p>Po zalogowaniu sie po raz pierwszy, zalecamy zmiane hasla na bardziej bezpieczne.</p>
        <p>Dziekujemy za korzystanie z naszej aplikacji!</p>
        <p>Z powazaniem,</p>
        MegaK v3 gr2`,
      );
    }

    return { ok: true };
  }

  async activateUser(id: string, activationToken: string) {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException();
    if (user.activationToken !== activationToken)
      throw new ForbiddenException();

    user.isActive = true;
    user.activationToken = null;
    return await user.save();
  }

  async resetPassword(email: string) {
    const user = await this.findOneByEmail(email);
    if (!user) throw new NotFoundException();

    const password = generateRandomPwd();
    user.pwdHash = await hashPwd(password);
    await user.save();

    await this.mailService.sendMail(
      email,
      'password reset',
      `
      <h3>Twoje hasło zostało zresetowane</h3>
      <p>Nowe hasło: <strong>${password}</strong></p>
      <p>Zalecamy zmianę hasła na nowe</p>
    `,
    );

    return { ok: true };
  }

  async changePassword(newPwd: string, user: UserFromReq) {
    const usr = await this.findOneById(user.userId);
    usr.pwdHash = await hashPwd(newPwd);
    await usr.save();

    return { ok: true };
  }

  async validateStudentInital(createStudentDto: CreateStudentInitialDto) {
    const student = plainToClass(CreateStudentInitialDto, createStudentDto);

    const errors = await validate(student);

    if (errors.length > 0) {
      const errorDetails = errors.map((error) => {
        const constraints = Object.values(error.constraints).join(', ');
        return constraints;
      });

      return {
        isValid: false,
        errorDetails,
      };
    }

    return {
      isValid: true,
    };
  }
}
