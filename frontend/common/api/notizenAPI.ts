/**
 * API related functions here.
 */

import axios from 'axios';
import {
  INote,
  NoteDetailResult,
} from '../interfaces/INote.interface';

import { NotesResult } from '../features/note/noteListSlice';
import { Notes, UpdateNoteDTO } from '../interfaces/INote.interface';

export async function getNotes(): Promise<NotesResult> {
  const url = `http://localhost:3000/notes?limit=100`;

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
  const url = `http://localhost:3000/notes/${noteId}`;
  try {
    const notesReponse = await axios.get<INote>(url);
    return {
      note: notesReponse.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function createNote(): Promise<NoteDetailResult> {
  const url = `http://localhost:3000/notes`;
  try {
    const noteReponse = await axios.post<INote>(url, {
      name: '',
      content: '',
    });
    return {
      note: noteReponse.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteNote(noteId: number): Promise<NoteDetailResult> {
  const url = `http://localhost:3000/notes/${noteId}`;
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


export async function updateNote(noteId: number, updateNoteDTO: UpdateNoteDTO): Promise<NoteDetailResult> {
  const url = `http://localhost:3000/notes/${noteId}`;
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
