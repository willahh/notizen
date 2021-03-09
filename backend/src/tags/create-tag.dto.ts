import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TagIcon } from 'src/notes/note-enum';
import { TagColor } from './tag-enum';

export class CreateTagDto {
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
