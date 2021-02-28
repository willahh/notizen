/**
 * API related functions here.
 */

import axios from 'axios';
import { INote, NoteDetailResult } from '../interfaces/INote.interface';

import { NotesResult } from '../features/note/noteListSlice';
import {
  Notes,
  UpdateNoteDTO,
  CreateNoteDTO,
} from '../interfaces/INote.interface';

const DEBUG = false;
const withDebug = (url: string, debug: boolean, debugThrowError: boolean) => {
  if (debug) {
    const a = url.includes('?') ? '&' : '?';
    url += a + 'debug=true' + (debugThrowError ? '&debugThrowError=true' : '');
  }
  return url;
};
const withUrl = (url: string, debugThrowError: boolean = false) => {
  return withDebug(url, DEBUG, debugThrowError);
};

export async function getNotes(): Promise<NotesResult> {
  const url = withUrl(`http://localhost:3000/notes?limit=100`);
  try {
    const notesReponse = await axios.get<INote[]>(url);
    const noteAcc: Notes = {};
    const notes = notesReponse.data.reduce((m, note) => {
      m[note.id] = note;
      return m;
    }, noteAcc);

    return {
      notes: notes,
    };
  } catch (err) {
    throw err;
  }
}

export async function getNoteByNoteId(
  noteId: number
): Promise<NoteDetailResult> {
  const url = withUrl(`http://localhost:3000/notes/${noteId}`);
  try {
    const notesReponse = await axios.get<INote>(url);
    return {
      note: notesReponse.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function createNote(
  createNoteDTO: CreateNoteDTO
): Promise<NoteDetailResult> {
  const url = withUrl(`http://localhost:3000/notes`);
  try {
    const response = await axios.post<INote>(url, createNoteDTO);
    return {
      note: response.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteNote(noteId: number): Promise<NoteDetailResult> {
  const url = withUrl(`http://localhost:3000/notes/${noteId}`);
  try {
    const response = await axios.delete<INote>(url);
    return {
      note: response.data,
    };
  } catch (err) {
    console.error('Une erreur est survenue', err);
    throw err;
  }
}

export async function updateNote(
  noteId: number,
  updateNoteDTO: UpdateNoteDTO
): Promise<NoteDetailResult> {
  const url = withUrl(`http://localhost:3000/notes/${noteId}`);
  try {
    const response = await axios.patch<INote>(url, updateNoteDTO);
    return {
      note: response.data,
    };
  } catch (err) {
    console.error('Une erreur est survenue', err);
    throw err;
  }
}
