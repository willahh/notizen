import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TagIcon } from '../notes/note-enum';
import { TagColor } from './tag-enum';

export class CreateTagDto {
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
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsOptional()
  @IsEnum(TagIcon)
  readonly icon: TagIcon;

  @IsOptional()
  @IsEnum(TagColor)
  readonly color: TagColor;
}
