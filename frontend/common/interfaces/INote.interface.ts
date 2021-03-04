/**
 * Interfaces should be shared between frontend and backend (domain ?).
 */

// Notes ------------------------
export interface INote {
  id: string;
  name?: string;
  content?: string;
  createDate: Date;
  updateDate: Date;
}

export interface Notes {
  [key: string]: INote;
}

export interface NoteDetailResult {
  note: INote;
}

export interface NotesResult {
  notes: Notes;
}

export interface UpdateNoteDTO {
  name?: string;
  content?: string;
}
export interface CreateNoteDTO {
  name?: string;
  content?: string;
}

// Tag ------------------------
// TODO: Share with backend
export interface TagEntity {
  id: number;
  name: string;
  isActive: boolean;
  createDate: Date;
  updateDate: Date;
}

export enum Mode {
  Default = 'DEFAULT',
  Edit = 'EDIT',
  Delete = 'DELETE',
}

export interface Tag extends TagEntity {
  mode: Mode
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