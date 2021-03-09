import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { TagIcon } from 'src/notes/note-enum';
import { UpdateDateColumn } from 'typeorm';
import { CreateTagDto } from './create-tag.dto';
import { TagColor } from './tag-enum';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @UpdateDateColumn()
  readonly updateDAte: Date;
}
