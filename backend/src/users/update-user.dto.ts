import { PartialType } from '@nestjs/mapped-types';
import { UpdateDateColumn } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @UpdateDateColumn()
  readonly updateDAte: Date;
}
