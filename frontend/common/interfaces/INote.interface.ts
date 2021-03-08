/**
 * Interfaces should be shared between frontend and backend (domain ?).
 * https://stackoverflow.com/questions/59571680/react-backend-project-structure-when-sharing-code
 */

// Notes ------------------------
export interface INote {
  id: string;
  name?: string;
  content?: string;
  createDate: Date;
  updateDate: Date;
  tags: Tag[];
}

export interface Notes {
  [key: string]: INote;
}

export interface NoteDetailResult {
  note: INote;
}

export interface CreateTagAndAddToNoteResult {
  note: INote;
  tag: Tag
}

export interface NotesResult {
  notes: Notes;
}

// TODO: Duplication with the backend
export interface UpdateNoteDTO {
  name?: string;
  content?: string;
}

// TODO: Duplication with the backend
export interface CreateNoteDTO {
  name?: string;
  content?: string;
}

// TODO: Duplication with the backend
export enum NoteAction {
  AddTag = 'ADD_TAG',
  RemoveTag = 'REMOVE_TAG',
  CreateTagAndAddToNote = 'CREATE_TAG_AND_TO_NOTE'
}

// TODO: Duplication with the backend
export interface NoteActionDto {
  actionType: NoteAction;
  noteId: number;
  tagName: string;
  tagId?: number;
}

// Tag ------------------------
export enum TagIcon {
  default = 'DEFAULT',
  tag = 'TAG',
  hashtag = 'HASHTAG',
}

export enum TagColor {
  default = 'GRAY',
  gray = 'GRAY',
  red = 'RED',
  yellow = 'YELLOW',
  green = 'GREEN',
  blue = 'BLUE',
  indigo = 'INDIGO',
  purple = 'PURPLE',
  pink = 'PINK',
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
  // noteId?: string;
}

export enum Mode {
  Default = 'DEFAULT',
  Edit = 'EDIT',
  Delete = 'DELETE',
}

// export interface Tag {
//   id: number;
//   name: string;
//   isActive: boolean;
//   createDate: Date;
//   updateDate: Date;
//   icon: TagIcon;
//   color: TagColor;
//   // noteId?: string;
// }

export interface Tag extends TagEntity {
  mode: Mode;
  icon: TagIcon;
  color: TagColor;
  visibleInFilterDropdown: boolean;
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
