/**
 * API related functions here.
 *
 * TODO: There is a symmetry between the functions in this namespace and the backend API controller methods.
 * When a new backend service is added, a new controller method is added to to expose the service,
 * then the frontend need to expose this service too.
 * Maybe there is something to do to avoid this "duplication".
 */

import * as Database from '../Database';

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
  NoteColor,
} from './interfaces';
import { NoteDocument } from '../Database';

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
    url +=
      a +
      'debug=true' +
      (debugThrowError ? '&debugThrowError=true' : '') +
      (sleepDelay ? `&sleepDelay=${sleepDelay}` : '');
  }
  return url;
};
const withUrl = (
  url: string,
  debugThrowError: boolean = false,
  sleepDelay: number | undefined = undefined
) => {
  return withDebug(url, DEBUG, debugThrowError, sleepDelay);
};

/* ----------------- note ------------------------- */
// TODO: Share with backend
export interface NotesQueryParams {
  start?: number;
  limit?: number;
  debug?: boolean;
  debugThrowError?: boolean;
  isFav?: boolean;
  isDeleted?: boolean;
  tagId?: string;
}

export async function getNotes(
  notesQueryParams: NotesQueryParams
): Promise<NotesResult> {
  console.log('getNotes');

  const db = await Database.get();
  const docs = await db.notes.find().exec();
  let notes = {};
  try {
    notes = docs.reduce((acc: any, doc: any) => {
      const noteRow = doc.toJSON();
      acc[noteRow.id] = noteRow;
      return acc;
    }, {});
  } catch (err) {
    console.error(err);
  }

  // }
  // const sub = db.notes
  //   .find({
  //     selector: {},
  //     sort: [{ name: 'asc' }],
  //   })
  //   .$.subscribe((notes) => {
  //     console.log('subscribe', notes);

  //     if (!notes) {
  //       return;
  //     }
  //     console.log('reload notes-list ');
  //     console.dir(notes);
  //     // this.setState({ notes, loading: false });
  //   });
  // // this.subs.push(sub);

  // TODO
  return {
    notes: notes,
  };
}

export async function getNoteByNoteId(
  noteId: string
): Promise<NoteDetailResult> {
  try {
    const db = await Database.get();
    const doc = await db.notes.findOne({ selector: { id: noteId } }).exec();
    const note = <INote>doc.toJSON();

    return {
      note: note,
    };
  } catch (err) {
    throw err;
  }
}

export async function createNote(
  createNoteDTO: CreateNoteDTO
): Promise<NoteDetailResult> {
  console.log('createNote', createNoteDTO);

  try {
    const db = await Database.get();
    const doc = await db.notes.insert(createNoteDTO);
    const note = <INote>doc.toJSON();

    return {
      note: note,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteNote(noteId: string): Promise<NoteDetailResult> {
  try {
    const db = await Database.get();
    const query = await db.notes.findOne({ selector: { id: noteId } });
    const response = await query.remove();
    const note = <INote>response.toJSON();

    return {
      note: note,
    };
  } catch (err) {
    console.error(
      "Une erreur est survenue, l'alignement des planètes n'est plus bon",
      err
    );
    throw err;
  }
}

export async function updateNote(
  updateNoteDTO: UpdateNoteDTO
): Promise<NoteDetailResult> {
  const { id } = updateNoteDTO;
  try {
    const db = await Database.get();
    const query = await db.notes.findOne({ selector: { id: id } });
    const response = await query.update(updateNoteDTO);
    const note = <INote>response.toJSON();
    return {
      note: note,
    };
  } catch (err) {
    throw err;
  }
}

export async function createTagAndAddToNote(
  noteActionDTO: NoteActionDTO
): Promise<CreateTagAndAddToNoteResult> {
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
