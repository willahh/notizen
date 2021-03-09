import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, isEnum, IsOptional } from 'class-validator';
import { UpdateDateColumn } from 'typeorm';
import { CreateNoteDto } from './create-note.dto';
import { NoteColor } from './note-enum';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @UpdateDateColumn()
  readonly updateDate: Date;

  @IsOptional()
  @IsBoolean()
  readonly isFav: boolean;

  @IsOptional()
  @IsEnum(NoteColor)
  readonly color: NoteColor;
}
