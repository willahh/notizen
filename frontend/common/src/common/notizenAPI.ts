/**
 * API related functions here.
 *
 * TODO: There is a symmetry between the functions in this namespace and the backend API controller methods.
 * When a new backend service is added, a new controller method is added to to expose the service,
 * then the frontend need to expose this service too.
 * Maybe there is something to do to avoid this "duplication".
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
  UpdateTagDTO,
  TagResult,
  NoteActionDTO,
  CreateTagAndAddToNoteResult,
  CreateTagDTO,
} from './interfaces';

/* ----------------- debug ------------------------- */
const DEBUG = false;

// TODO: use a .env to manage environments
const API_URL = 'http://localhost:3000';
// const API_URL = 'https://notizenapp-306803.ew.r.appspot.com';
const withDebug = (
  url: string,
  debug: boolean,
  debugThrowError: boolean,
  sleepDelay?: number
) => {
  if (debug) {
    const a = url.includes('?') ? '&' : '?';
    url += a + 'debug=true' + (debugThrowError ? '&debugThrowError=true' : '') + (sleepDelay ? `&sleepDelay=${sleepDelay}` : '');
  }
  return url;
};
const withUrl = (url: string, debugThrowError: boolean = false, sleepDelay: number = undefined) => {
  console.log('withUrl', debugThrowError);

  return withDebug(url, DEBUG, debugThrowError, sleepDelay);
};

/* ----------------- note ------------------------- */
export async function getNotes(): Promise<NotesResult> {
  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const url = withUrl(`${API_URL}/notes?limit=100`);
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
  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const url = withUrl(`${API_URL}/notes/${noteId}`);
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
  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const url = withUrl(`${API_URL}/notes`);
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
  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const url = withUrl(`${API_URL}/notes/${noteId}`);
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
  updateNoteDTO: UpdateNoteDTO
): Promise<NoteDetailResult> {
  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const { id } = updateNoteDTO;
  const url = withUrl(`${API_URL}/notes/${id}`);
  try {
    const response = await axios.patch<INote>(url, updateNoteDTO);
    return {
      note: response.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function createTagAndAddToNote(
  noteActionDTO: NoteActionDTO
): Promise<CreateTagAndAddToNoteResult> {
  console.log('createTagAndAddToNote', noteActionDTO);
  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const { noteId } = noteActionDTO;
  const url = withUrl(`${API_URL}/notes/${noteId}/actions`);
  try {
    const response = await axios.post<CreateTagAndAddToNoteResult>(
      url,
      noteActionDTO
    );
    return {
      note: response.data.note,
      tag: response.data.tag,
    };
  } catch (err) {
    throw err;
  }
}

export async function addTagToNote(
  noteActionDTO: NoteActionDTO
): Promise<NoteDetailResult> {
  console.log('addTagToNote', noteActionDTO);
  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const { noteId } = noteActionDTO;
  const url = withUrl(`${API_URL}/notes/${noteId}/actions`, false, 2000);
  try {
    const response = await axios.post<INote>(url, noteActionDTO);
    const note = response.data;
    return {
      note: note,
    };
  } catch (err) {
    throw err;
  }
}

export async function removeTagToNote(
  noteActionDTO: NoteActionDTO
): Promise<NoteDetailResult> {
  console.log('removeTagToNote', noteActionDTO);
  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const { noteId } = noteActionDTO;
  const url = withUrl(`${API_URL}/notes/${noteId}/actions`, false, 2000);
  try {
    const response = await axios.post<INote>(url, noteActionDTO);
    const note = response.data;
    return {
      note: note,
    };
  } catch (err) {
    throw err;
  }
}

/* ----------------- tags ------------------------- */
export async function getTags(): Promise<TagsResult> {
  console.log('getTags');

  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const url = withUrl(`${API_URL}/tags?limit=100`);

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
  createTagDTO: CreateTagDTO
): Promise<TagResult> {
  console.log('createTag', createTagDTO);

  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const url = withUrl(`${API_URL}/tags/`, true);
  try {
    const response = await axios.post<Tag>(url, createTagDTO);
    return {
      tagEntity: response.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function updateTag(
  tagId: string,
  updateTagDto: UpdateTagDTO
): Promise<TagResult> {
  console.log('updateTag', tagId);

  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const url = withUrl(`${API_URL}/tags/${tagId}`);
  try {
    const response = await axios.patch<Tag>(url, updateTagDto);
    return {
      tagEntity: response.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteTag(tagId: string): Promise<TagResult> {
  console.log('deleteTag', tagId);

  if (!navigator.onLine) {
    throw new Error(`No connection detected, cannot do request`);
  }

  const url = withUrl(`${API_URL}/tags/${tagId}`, true);
  try {
    const response = await axios.delete(url);
    return {
      tagEntity: response.data,
    };
  } catch (err) {
    throw err;
  }
}
