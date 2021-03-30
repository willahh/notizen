import { IsString, IsDate, IsUUID, IsOptional, IsJSON, IsArray } from "class-validator";

export class CreateNoteDTO {
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

  @IsArray()
  readonly content // INFO: Post don't works with type Array<Object> 
}
