/**
 * Interfaces should be shared between frontend and backend (domain ?).
 * https://stackoverflow.com/questions/59571680/react-backend-project-structure-when-sharing-code
 */
import { Node } from 'slate';

// Notes ------------------------
// TODO: Share with backend
export interface INote {
  id: string;
  createDate: string;
  updateDate: string;
  name?: string;
  content: Node[];
  color: NoteColor;
  isFav: boolean;
  isDeleted: boolean;
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
  tag: TagEntity;
}

export interface NotesResult {
  notes: Notes;
}

// TODO: Share with the backend
export interface UpdateNoteDTO {
  id: string;
  name?: string;
  content?: Node[];
  isFav?: boolean;
  color?: NoteColor;
}

export interface CreateNoteDTO extends INote {}

// TODO: Share with the backend
export enum NoteAction {
  AddTag = 'ADD_TAG',
  RemoveTag = 'REMOVE_TAG',
  CreateTagAndAddToNote = 'CREATE_TAG_AND_TO_NOTE',
}

// TODO: Share with the backend
export interface NoteActionDTO {
  actionType: NoteAction;
  noteId: string;
  tagName?: string;
  tagId: string;
  tagIcon?: TagIcon;
  tagColor?: TagColor;
}

// Tag ------------------------
// TODO: Share with backend
export enum TagIcon {
  TAG = 'TAG',
  HASHTAG = 'HASHTAG',
}

// TODO: Share with backend
export enum TagColor {
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
  GRAY = 'GRAY',
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  INDIGO = 'INDIGO',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
}

export enum Mode {
  Default = 'DEFAULT',
  Edit = 'EDIT',
  Delete = 'DELETE',
}

// TODO: Share with backend
export interface TagEntity {
  id: string;
  createDate: string;
  updateDate: string;
  name: string;
  icon: TagIcon;
  color: TagColor;
  isDeleted: boolean;
}

export interface CreateTagDTO {
  id: string;
  createDate: string;
  updateDate: string;
  isDeleted: boolean;
  icon: TagIcon;
  color: TagColor;
  name: string;
}

export interface UpdateTagDTO {
  updateDate?: string;
  isDeleted?: boolean;
  icon?: TagIcon;
  color?: TagColor;
  name?: string;
}

export interface Tag extends TagEntity {
  mode: Mode;
}

export interface Tags {
  [key: string]: Tag;
}

export interface TagsResult {
  tags: Tags;
}

export interface TagResult {
  tagEntity: TagEntity;
}
