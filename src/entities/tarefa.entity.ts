import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';
import { MESSAGES_V1 } from 'src/constraints/messages';
import { Usuario } from './usuario.entity';

@Entity({ name: 'tarefas' })
export class Tarefa {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id_tarefa' })
  id: string;

  @ApiProperty()
  @IsOptional({ message: MESSAGES_V1.MSG001.replace('<>', 'descricao') })
  @Column({ name: 'descricao', type: 'varchar', length: 150, nullable: false })
  descricao: string;

  @ApiProperty({ type: () => Usuario })
  @IsDefined({ message: MESSAGES_V1.MSG001.replace('<>', 'usuario') })
  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @CreateDateColumn({ name: 'dt_cadast' })
  dtCadastro: Date;

  @UpdateDateColumn({ name: 'dt_altera' })
  dtAlteracao: Date;
}