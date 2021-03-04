/**
 * API related functions here.
 */

import axios from 'axios';
import {
  Notes,
  UpdateNoteDTO,
  CreateNoteDTO,
  INote,
  NoteDetailResult,
  NotesResult,
  TagsResult,
  Tag,
  Tags,
  updateTagDto,
  TagResult,
  createTagDto,
} from '../interfaces/INote.interface';

/* ----------------- debug ------------------------- */
const DEBUG = false;
const withDebug = (url: string, debug: boolean, debugThrowError: boolean) => {
  if (debug) {
    const a = url.includes('?') ? '&' : '?';
    url += a + 'debug=true' + (debugThrowError ? '&debugThrowError=true' : '');
  }
  return url;
};
const withUrl = (url: string, debugThrowError: boolean = false) => {
  console.log('withUrl', debugThrowError);

  return withDebug(url, DEBUG, debugThrowError);
};

/* ----------------- note ------------------------- */
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
  noteId: string
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

export async function deleteNote(noteId: string): Promise<NoteDetailResult> {
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

/* ----------------- tags ------------------------- */
export async function getTags(): Promise<TagsResult> {
  const url = withUrl(`http://localhost:3000/tags?limit=100`);

  try {
    const tagsResponse = await axios.get<Tag[]>(url);
    const tagsAcc: Tags = {};
    const tags = tagsResponse.data.reduce((m, tag) => {
      m[tag.id] = tag;
      return m;
    }, tagsAcc);

    return {
      tags: tags,
    };
  } catch (err) {
    throw err;
  }
}

export async function createTag(
  createTagDto: createTagDto
): Promise<TagResult> {
  const url = withUrl(`http://localhost:3000/tags/`, true);
  try {
    const response = await axios.post<Tag>(url, createTagDto);
    return {
      tag: response.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function updateTag(
  tagId: number,
  updateTagDto: updateTagDto
): Promise<TagResult> {
  const url = withUrl(`http://localhost:3000/tags/${tagId}`);
  try {
    const response = await axios.patch<Tag>(url, updateTagDto);
    return {
      tag: response.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteTag(tagId: number): Promise<TagResult> {
  const url = withUrl(`http://localhost:3000/tags/${tagId}`, true);
  try {
    const response = await axios.delete(url);
    return {
      tag: response.data,
    };
  } catch (err) {
    throw err;
  }
}
