import { IsString } from "class-validator";

export class CreateNoteDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly content: string;
}
