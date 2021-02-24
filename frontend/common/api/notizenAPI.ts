/**
 * API related functions here.
 */

import axios from 'axios';
import { INote, NotesResult } from '../interfaces/INote.interface';

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
