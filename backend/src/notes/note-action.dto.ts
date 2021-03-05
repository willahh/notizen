import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum NoteAction {
  AddTag = 'ADD_TAG',
  RemoveTag = 'REMOVE_TAG',
  CreateTagAndAddToNote = 'CREATE_TAG_AND_TO_NOTE'
}

export class NoteActionDto {
  @IsEnum(NoteAction)
  readonly actionType: NoteAction;

  @IsNumber()
  @IsOptional()
  readonly noteId: number;

  @IsString()
  readonly tagName: string;
}
