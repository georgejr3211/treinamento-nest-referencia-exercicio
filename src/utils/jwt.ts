import * as jwt from 'jsonwebtoken';

export function prepareToken(payload: any): string {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d' });
}

export function verifyToken(token: string): string | object {
  return jwt.verify(token, process.env.JWT_SECRET);
}