import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { MESSAGES_V1 } from 'src/constraints/messages';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async findByEmail(email: string) {
    try {
      const result = await this.usuarioRepository.findOne({ email });

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOne(id: string) {
    try {
      const result = await this.usuarioRepository.createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.tarefas', 'tarefas')
        .where('usuario.id = :id', { id })
        .getManyAndCount();

      if (!result) {
        throw new HttpException(MESSAGES_V1.MSG003, HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async save(data: Usuario) {
    try {
      const result = await this.usuarioRepository.save(data);

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async destroy(id: string) {
    try {
      const result = await this.usuarioRepository.findOne(id);
      if (!result) {
        throw new HttpException(MESSAGES_V1.MSG003, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      await this.usuarioRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
