import { MESSAGES_V1 } from 'src/constraints/messages';
import { IsDefined } from 'class-validator';

export default class AuthDto {
  @IsDefined({ message: MESSAGES_V1.MSG001.replace('<>', 'e-mail') })
  readonly email!: string;
  @IsDefined({ message: MESSAGES_V1.MSG001.replace('<>', 'senha') })
  readonly senha!: string;
}
