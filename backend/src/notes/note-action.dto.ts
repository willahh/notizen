import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TagColor } from '../tags/tag-enum';
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

  @IsUUID()
  @IsOptional()
  readonly noteId: string;

  @IsString()
  @IsOptional()
  readonly tagName: string;

  @IsUUID()
  @IsOptional()
  readonly tagId: string;

  @IsOptional()
  @IsEnum(TagIcon)
  readonly tagIcon: TagIcon;

  @IsOptional()
  @IsEnum(TagColor)
  readonly tagColor: TagColor;
}
