/**
 * API related functions here.
 */

import axios from 'axios';
import {
  INote,
  NoteDetailResult,
  NotesResult,
} from '../interfaces/INote.interface';

export async function getNotes(): Promise<NotesResult> {
  const url = `http://localhost:3000/notes?limit=10`;

  try {
    const notesReponse = await axios.get<INote[]>(url);
    return {
      notes: notesReponse.data,
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