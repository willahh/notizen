import { PartialType } from '@nestjs/mapped-types';
import { UpdateDateColumn } from 'typeorm';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @UpdateDateColumn()
  readonly updateDate: Date;
}
