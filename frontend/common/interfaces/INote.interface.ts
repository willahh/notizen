/**
 * Interfaces should be shared between frontend and backend (domain ?).
 * https://stackoverflow.com/questions/59571680/react-backend-project-structure-when-sharing-code
 */

// Notes ------------------------
// TODO: Share with backend
export interface INote {
  id: string;
  name?: string;
  content?: string;
  createDate: Date;
  updateDate: Date;
  tags: Tag[];
  isFav: boolean;
  color: NoteColor;
}

export interface Notes {
  [key: string]: INote;
}

export interface NoteDetailResult {
  note: INote;
}

export interface CreateTagAndAddToNoteResult {
  note: INote;
  tag: Tag;
}

export interface NotesResult {
  notes: Notes;
}

// TODO: Share with the backend
export interface UpdateNoteDTO {
  name?: string;
  content?: string;
  isFav?: boolean;
  color?: NoteColor;
}

// TODO: Share with the backend
export interface CreateNoteDTO {
  name?: string;
  content?: string;
}

// TODO: Share with the backend
export enum NoteAction {
  AddTag = 'ADD_TAG',
  RemoveTag = 'REMOVE_TAG',
  CreateTagAndAddToNote = 'CREATE_TAG_AND_TO_NOTE',
}

// TODO: Share with the backend
export interface NoteActionDto {
  actionType: NoteAction;
  noteId: number;
  tagName?: string;
  tagId?: number;
  tagIcon?: TagIcon;
  tagColor?: TagColor;
}

// Tag ------------------------
// TODO: Share with backend
export enum TagIcon {
  // DEFAULT = 'DEFAULT',
  TAG = 'TAG',
  HASHTAG = 'HASHTAG',
}

// TODO: Share with backend
export enum TagColor {
  // DEFAULT = 'GRAY',
  GRAY = 'GRAY',
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  INDIGO = 'INDIGO',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
}

// TODO: Share with backend
export enum NoteColor {
  // DEFAULT = 'GRAY',
  GRAY = 'GRAY',
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  INDIGO = 'INDIGO',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
}

// TODO: Share with backend
export interface TagEntity {
  id: number;
  name: string;
  isActive: boolean;
  createDate: Date;
  updateDate: Date;
  icon: TagIcon;
  color: TagColor;
}

export enum Mode {
  Default = 'DEFAULT',
  Edit = 'EDIT',
  Delete = 'DELETE',
}

export interface Tag extends TagEntity {
  mode: Mode;
  icon: TagIcon;
  color: TagColor;
}

export interface Tags {
  [key: string]: Tag;
}

export interface TagsResult {
  tags: Tags;
}

export interface TagResult {
  tag: Tag;
}

export interface updateTagDto {
  name: string;
}

export interface createTagDto {
  name: string;
}
