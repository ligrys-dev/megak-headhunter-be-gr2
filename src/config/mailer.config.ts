export const getMailerConfig = () => ({
  transport: `smtp://admin:admin1@localhost:2500`, //XXX Mailsluper -> in future move to real smtp
  defaults: {
    from: 'noreply@megak.headhunter.com',
  },
  template: {
    dir: '.',
    options: {
      strict: true,
    },
  },
});

// import { ConfigService } from '@nestjs/config';

// export const getMailerConfig = (configService: ConfigService) => ({
//   transport: {
//     host: configService.get('EMAIL_HOST'),
//     port: +configService.get('EMAIL_PORT'),
//     auth: {
//       user: configService.get('EMAIL_USER'),
//       pass: configService.get('EMAIL_PASSWORD'),
//     },
//   },
//   defaults: {
//     from: 'noreply@megak.headhunter.com',
//   },
//   template: {
//     dir: '.',
//     options: {
//       strict: true,
//     },
//   },
