import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateStudentDto } from './dto/create-user.dto';
import { Role, UserWithRandomPwd as UserWithRandomPwd } from 'src/types';
import { hashPwd } from 'src/utils/handle-pwd';
import { generateRandomPwd } from 'src/utils/generate-random-pwd';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MailService } from 'src/common/mail/mail.service';

@Injectable()
export class UserService {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private mailService: MailService,
  ) {}

  async findOneByEmail(email: string) {
    return await User.findOneBy({ email });
  }

  async findOneById(id: string) {
    return await User.findOneBy({ id });
  }

  async createStudents(createStudentDtos: CreateStudentDto[]) {
    const createdUsers: UserWithRandomPwd[] = [];

    try {
      for (const createStudentDto of createStudentDtos) {
        const { email, ...data } = createStudentDto;
        const password = generateRandomPwd();

        const user = new User();
        user.email = email;
        user.role = Role.STUDENT;
        user.pwdHash = await hashPwd(password);
        const newUser = await user.save();

        createdUsers.push({ newUser, password });

        // const student = new Student()
        // for (const [key, value] of Object.entries(data)) {
        //   student[key] = value;
        // }
        // student.email = email
        // await student.save()
        console.log(data); // TODO to implement when student entitity will be implemented
      }
      return await this.cacheManager.set('users-to-activate', createdUsers);
    } catch (e) {
      throw new Error(e);
    }
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
}
