import { Body, Controller, Next, Post, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { MESSAGES_V1 } from 'src/constraints/messages';

import { Public } from './../../decorators/public.decorator';
import AuthDto from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) { }

  @Public()
  @Post()
  async onLogin(@Body() body: AuthDto, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const result = await this.authService.onLogin(body);

      return res.send({ data: result, responseMessage: MESSAGES_V1.MSG002 });
    } catch (error) {
      next(error);
    }
  }

}
