import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';

@Injectable()
export class LowerCasePipe implements PipeTransform {
  transform(value: Usuario, metadata: ArgumentMetadata) {
    value.email = value.email.toLocaleLowerCase();

    return value;
  }
}
