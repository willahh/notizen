import { IsString, IsDate, IsUUID, IsOptional } from "class-validator";

export class CreateNoteDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsDate()
  @IsOptional()
  createDate?: Date;

  @IsDate()
  @IsOptional()
  updateDate?: Date;
  
  @IsString()
  readonly name: string;

  @IsString()
  readonly content: string;
}
