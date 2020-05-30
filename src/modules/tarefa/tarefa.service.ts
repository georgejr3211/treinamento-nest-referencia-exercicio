import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarefa } from 'src/entities/tarefa.entity';
import { Repository } from 'typeorm';
import { MESSAGES_V1 } from 'src/constraints/messages';

@Injectable()
export class TarefaService {

  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepository: Repository<Tarefa>,
  ) { }

  async getAll() {
    try {
      const result = await this.tarefaRepository.createQueryBuilder('tarefas')
        .innerJoinAndSelect('tarefas.usuario', 'usuario')
        .getManyAndCount();

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOne(id: string) {
    try {
      const result = await this.tarefaRepository.findOne(id);
      if (!result) {
        throw new HttpException(MESSAGES_V1.MSG003, HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async save(data: Tarefa) {
    try {
      const result = await this.tarefaRepository.save(data);

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async destroy(id: string) {
    try {
      const result = await this.tarefaRepository.findOne(id);
      if (!result) {
        throw new HttpException(MESSAGES_V1.MSG003, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      await this.tarefaRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
