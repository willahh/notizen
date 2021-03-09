import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TagColor } from 'src/tags/tag-enum';
import { NoteColor, TagIcon } from './note-enum';

export enum NoteAction {
  AddTag = 'ADD_TAG',
  RemoveTag = 'REMOVE_TAG',
  CreateTagAndAddToNote = 'CREATE_TAG_AND_TO_NOTE',
  AddToFav = 'ADD_TO_FAV',
  RemoveToFav = 'REMOVE_TO_FAV',
  UpdateColor = 'UPDATE_COLOR',
}

export class NoteActionDto {
  @IsEnum(NoteAction)
  readonly actionType: NoteAction;

  @IsNumber()
  @IsOptional()
  readonly noteId: number;

  @IsString()
  @IsOptional()
  readonly tagName: string;

  @IsNumber()
  @IsOptional()
  readonly tagId: number;

  @IsOptional()
  @IsEnum(TagIcon)
  readonly tagIcon: TagIcon;

  @IsOptional()
  @IsEnum(TagColor)
  readonly tagColor: TagColor;
}
