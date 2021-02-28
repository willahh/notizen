/**
 * Interfaces should be shared between frontend and backend (domain ?).
 */

export interface Notes {
  [key: string]: INote;
}

export interface INote {
  id: number;
  name?: string;
  content?: string;
  createDate: Date;
  updateDate: Date;
}

export interface NoteDetailResult {
  note: INote;
}

// TODO: Share with backend
export interface UpdateNoteDTO {
  name?: string;
  content?: string;
}
export interface CreateNoteDTO {
  name?: string;
  content?: string;
}