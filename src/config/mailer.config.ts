import { ConfigService } from '@nestjs/config';

export const getMailerConfig = (configService: ConfigService) => {
  const isSmtpMock = configService.get('USE_SMTP_MOCK');

  const transportConfig = isSmtpMock
    ? {
        transport: `smtp://admin:admin1@localhost:2500`, // XXX Mailsluper
      }
    : {
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: +configService.get('EMAIL_PORT'),
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
      };

  return {
    ...transportConfig,
    defaults: {
      from: 'noreply@megak.headhunter.com',
    },
    template: {
      dir: '.',
      options: {
        strict: true,
      },
    },
  };
};
