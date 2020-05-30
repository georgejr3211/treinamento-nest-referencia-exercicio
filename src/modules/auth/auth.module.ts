import { Module } from '@nestjs/common';

import { UsuarioModule } from '../usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsuarioModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
