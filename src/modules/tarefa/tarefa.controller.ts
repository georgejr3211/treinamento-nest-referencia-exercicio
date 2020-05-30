import { Body, Controller, Delete, Get, Next, Param, Post, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { MESSAGES_V1 } from 'src/constraints/messages';
import { Tarefa } from 'src/entities/tarefa.entity';

import { TarefaService } from './tarefa.service';

@Controller('tarefas')
export class TarefaController {

  constructor(
    private readonly tarefaService: TarefaService,
  ) { }

  @Get()
  async loadAll(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result = await this.tarefaService.getAll();

      return res.send({ data: result[0], total: result[1], responseMessage: MESSAGES_V1.MSG002 });
    } catch (error) {
      next(error);
    }
  }

  @Get(':id')
  async loadOne(@Param() id: string, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const result = await this.tarefaService.getOne(id);

      return res.send({ data: result, responseMessage: MESSAGES_V1.MSG002 });
    } catch (error) {
      next(error);
    }
  }

  @Post()
  async save(@Body() data: Tarefa, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const result = await this.tarefaService.save(data);

      return res.send({ data: result, responseMessage: MESSAGES_V1.MSG002 });
    } catch (error) {
      next(error);
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response, @Next() next: NextFunction) {
    try {
      await this.tarefaService.destroy(id);

      return res.send({ responseMessage: MESSAGES_V1.MSG002 });
    } catch (error) {
      next(error);
    }
  }

}
