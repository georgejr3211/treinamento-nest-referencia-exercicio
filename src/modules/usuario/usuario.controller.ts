import { Body, Controller, Delete, Get, Next, Post, Req, Res, UsePipes } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MESSAGES_V1 } from 'src/constraints/messages';
import { Public } from 'src/decorators/public.decorator';
import { Usuario } from 'src/entities/usuario.entity';

import { HashPasswordPipe } from './pipes/hash-password.pipe';
import { LowerCasePipe } from './pipes/lower-case.pipe';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {

  constructor(
    private readonly usuarioService: UsuarioService,
  ) { }

  @Get()
  async loadOne(@Res() res: Response, @Next() next: NextFunction, @Req() request: Request | any) {
    try {
      const usuario: Usuario = request.usuario;
      const result = await this.usuarioService.getOne(usuario.id);

      return res.send({ data: result, responseMessage: MESSAGES_V1.MSG002 });
    } catch (error) {
      next(error);
    }
  }

  @Public()
  @Post()
  @UsePipes(new LowerCasePipe())
  @UsePipes(new HashPasswordPipe())
  async save(@Body() data: Usuario, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const result = await this.usuarioService.save(data);

      return res.send({ data: result, responseMessage: MESSAGES_V1.MSG002 });
    } catch (error) {
      next(error);
    }
  }

  @Delete()
  async destroy(@Res() res: Response, @Next() next: NextFunction, @Req() request: Request | any) {
    try {
      const usuario: Usuario = request.usuario;
      await this.usuarioService.destroy(usuario.id);

      return res.send({ responseMessage: MESSAGES_V1.MSG002 });
    } catch (error) {
      next(error);
    }
  }

}
