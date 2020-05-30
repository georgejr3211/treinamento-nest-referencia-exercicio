import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { MESSAGES_V1 } from 'src/constraints/messages';
import { verifyToken } from 'src/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private readonly reflector: Reflector) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    const { authorization } = headers;

    if (isPublic) {
      return true;
    }

    if (!authorization) {
      throw new HttpException(MESSAGES_V1.MSG005, HttpStatus.FORBIDDEN);
    }

    try {
      const payload = verifyToken(authorization);

      request.usuario = payload;
    } catch (error) {
      throw new HttpException(MESSAGES_V1.MSG006, HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}