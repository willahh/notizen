import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  // @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
