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
