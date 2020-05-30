import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';
import { MESSAGES_V1 } from 'src/constraints/messages';
import { Tarefa } from './tarefa.entity';
import { hashPassword } from 'src/utils/password';

@Entity({ name: 'usuarios' })
export class Usuario {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id_usuario' })
  id: string;

  @ApiProperty()
  @IsDefined({ message: MESSAGES_V1.MSG001.replace('<>', 'e-mail') })
  @Column({ name: 'email', type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @IsDefined({ message: MESSAGES_V1.MSG001.replace('<>', 'senha') })
  @Column({ name: 'senha', type: 'varchar', length: 150, nullable: false })
  senha: string;

  @ApiProperty()
  @IsOptional()
  @OneToMany(() => Tarefa, tarefa => tarefa.usuario, { cascade: true })
  tarefas: Tarefa[];

  @CreateDateColumn({ name: 'dt_cadast' })
  dtCadastro: Date;

  @UpdateDateColumn({ name: 'dt_altera' })
  dtAlteracao: Date;
}