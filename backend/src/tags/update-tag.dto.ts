import { PartialType } from '@nestjs/mapped-types';
import { UpdateDateColumn } from 'typeorm';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @UpdateDateColumn()
  readonly updateDAte: Date;
}
