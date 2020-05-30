import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password);
}

export function decryptPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
