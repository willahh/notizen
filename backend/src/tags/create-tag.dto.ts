import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
