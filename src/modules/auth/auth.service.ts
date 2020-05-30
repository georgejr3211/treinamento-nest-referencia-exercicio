import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UsuarioService } from '../usuario/usuario.service';
import AuthDto from './auth.dto';
import { MESSAGES_V1 } from 'src/constraints/messages';
import { decryptPassword } from 'src/utils/password';
import { prepareToken } from 'src/utils/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuarioService: UsuarioService,
  ) { }

  async onLogin(authDto: AuthDto) {
    try {
      const usuario = await this.usuarioService.findByEmail(authDto.email);
      if (!usuario) {
        throw new HttpException(MESSAGES_V1.MSG003, HttpStatus.NOT_FOUND);
      }

      const isEqual = decryptPassword(authDto.senha, usuario.senha);

      if (!isEqual) {
        throw new HttpException(MESSAGES_V1.MSG004, HttpStatus.BAD_REQUEST);
      }

      const payload = {
        id: usuario.id,
        email: usuario.email,
      };

      const token = prepareToken(payload);
      
      return token;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
