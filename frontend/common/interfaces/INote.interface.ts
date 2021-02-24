/**
 * Interfaces should be shared between frontend and backend (domain ?).
 */
export interface INote {
  id: number;
  name?: string;
  content?: string;
  createDate: Date;
  updateDate: Date;
}

export interface NotesResult {
  notes: INote[];
}
