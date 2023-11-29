import { hash, compare } from 'bcrypt';

export async function comparePwd(plaintextPwd: string, hashedPwd: string) {
  return await compare(plaintextPwd, hashedPwd);
}

export async function hashPwd(plaintextPwd: string) {
  return await hash(plaintextPwd, 10);
}
