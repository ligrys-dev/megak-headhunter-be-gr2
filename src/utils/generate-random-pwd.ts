import generatePassword, { charsets } from 'pswd-generator';

export function generateRandomPwd() {
  let password = '';

  for (let i = 0; i < 3; i++) {
    password +=
      generatePassword(
        5,
        charsets.NUMBERS + charsets.LOWERCASE + charsets.UPPERCASE,
      ) + '_';
  }

  return password.slice(0, password.length - 1);
}
