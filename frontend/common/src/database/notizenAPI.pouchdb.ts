/**
 * API related functions here.
 *
 * TODO: There is a symmetry between the functions in this namespace and the backend API controller methods.
 * When a new backend service is added, a new controller method is added to to expose the service,
 * then the frontend need to expose this service too.
 * Maybe there is something to do to avoid this "duplication".
 *
 * TODO: use Rxdb reactive functions, examples here : https://codesandbox.io/s/7zo06w5kr0?file=/src/hero-insert/hero-insert.jsx
 */

import axios from 'axios';
import * as Database from './Database';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateNoteDTO,
  CreateTagAndAddToNoteResult,
  CreateTagDTO,
  INote,
  NoteActionDTO,
  NoteDetailResult,
  NotesResult,
  Tag,
  TagEntity,
  TagResult,
  Tags,
  TagsResult,
  UpdateNoteDTO,
  UpdateTagDTO,
} from '../common/interfaces';
import { getCurrentUserInfo } from './Auth';

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
  console.log('getNotes', notesQueryParams);

  let notes = {};
  try {
    const db = await Database.get();
    const query = await db.notes.find().where(notesQueryParams);
    const docs = await query.exec();
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
  console.log('getNoteByNoteId noteId', noteId);

  try {
    const db = await Database.get();
    const doc = await db.notes.findOne({ selector: { id: noteId } }).exec();
    const note = <INote>doc.toJSON();

    return {
      note: note,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createNote(
  createNoteDTO: CreateNoteDTO
): Promise<NoteDetailResult> {
  console.log('createNote', createNoteDTO);

  try {
    // https://blog.cloudant.com/2019/05/24/Partitioned-Databases-with-Cloudant-Libraries.html#insert-data-into-a-partition
    const db = await Database.get();
    const doc = await db.notes.insert(createNoteDTO);
    const note = <INote>doc.toJSON();

    return {
      note: note,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteNote(noteId: string): Promise<NoteDetailResult> {
  console.log('deleteNote', noteId);

  try {
    const db = await Database.get();
    const query = await db.notes.findOne({ selector: { id: noteId } });
    const doc = await query.remove();
    const note = <INote>doc.toJSON();

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
  console.log('updateNote', updateNote);
  const { id } = updateNoteDTO;
  try {
    const db = await Database.get();
    const query = await db.notes.findOne({ selector: { id: id } });
    const doc = await query.exec();
    const note = <INote>(await doc.atomicPatch(updateNoteDTO)).toJSON();

    return {
      note: note,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* ----------------- note - tags ------------------------- */
// TODO !!!!!!!!
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
  console.log('addTagToNote', noteActionDTO);

  try {
    const userInfo = getCurrentUserInfo();
    const noteTagId = userInfo.userId + ':' +  uuidv4();
    const { noteId, tagId } = noteActionDTO;
    // https://blog.cloudant.com/2019/05/24/Partitioned-Databases-with-Cloudant-Libraries.html#insert-data-into-a-partition
    const db = await Database.get();
    await db.notestags.insert({
      id: noteTagId,
      noteId: noteId,
      tagId: tagId,
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
    });

    const noteDoc = await db.notes.findOne({ selector: { id: noteId } }).exec();
    const note = <INote>noteDoc.toJSON();

    return {
      note: note,
    };
  } catch (err) {
    console.error(err);
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
export interface TagsQueryParams {}
export async function getTags(
  tagsQueryParams: TagsQueryParams
): Promise<TagsResult> {
  try {
    const db = await Database.get();
    const query = await db.tags.find().where(tagsQueryParams);
    const docs = await query.exec();
    const tags = docs.reduce((acc: any, doc: any) => {
      const row = doc.toJSON();
      acc[row.id] = row;
      return acc;
    }, {});

    return { tags: tags };
  } catch (err) {
    console.error(err);
  }
}

export async function createTag(
  createTagDTO: CreateTagDTO
): Promise<TagResult> {
  try {
    const db = await Database.get();
    const doc = await db.tags.insert(createTagDTO);
    const tag = <TagEntity>doc.toJSON();

    return {
      tagEntity: tag,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateTag(
  tagId: string,
  updateTagDto: UpdateTagDTO
): Promise<TagResult> {
  try {
    const db = await Database.get();
    const query = await db.tags.findOne({ selector: { id: tagId } });
    const doc = await query.exec();
    const tag = <TagEntity>(await doc.atomicPatch(updateTagDto)).toJSON();

    return {
      tagEntity: tag,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteTag(tagId: string): Promise<TagResult> {
  console.log('deleteTag', tagId);

  try {
    const db = await Database.get();
    const query = await db.tags.findOne({ selector: { id: tagId } });
    const doc = await query.remove();
    const tag = <TagEntity>doc.toJSON();

    return {
      tagEntity: tag,
    };
  } catch (err) {
    console.error(
      "Une erreur est survenue, l'alignement des planètes n'est plus bon",
      err
    );
    throw err;
  }
}
