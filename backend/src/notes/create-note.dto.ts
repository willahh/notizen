import { IsString, IsDateString, IsDate } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateNoteDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly content: string;
}
