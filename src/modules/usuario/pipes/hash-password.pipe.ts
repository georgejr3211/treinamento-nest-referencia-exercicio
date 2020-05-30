import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { hashPassword } from 'src/utils/password';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  transform(value: Usuario, metadata: ArgumentMetadata) {
    value.senha = hashPassword(value.senha);
    return value;
  }
}
