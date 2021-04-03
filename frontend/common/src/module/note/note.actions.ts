import { createAsyncThunk } from '@reduxjs/toolkit';
import { addAction, createAction } from '../../common/actions';
import {
  CreateNoteDTO,
  CreateTagAndAddToNoteResult,
  NoteActionDTO,
  NoteDetailResult,
  NotesResult,
  Tag,
  UpdateNoteDTO,
} from '../../common/interfaces';
import {
  addTagToNote,
  createNote,
  createTagAndAddToNote,
  deleteNote,
  getNoteByNoteId,
  getNotes,
  NotesQueryParams,
  removeTagToNote,
  updateNote,
} from '../../database/notizenAPI.pouchdb';

/**
 * NOTES_SET_SELECTED_NOTE_ID
 */
export const NOTES_SET_SELECTED_NOTE_ID = 'NOTES/SET_SELECTED_NOTE_ID';
export interface SetSelectedNoteIdActionPayload {
  noteId?: string;
}
export const setSelectedNoteIdAction = createAction(
  NOTES_SET_SELECTED_NOTE_ID,
  (payload: SetSelectedNoteIdActionPayload) => {
    const noteId = payload.noteId;
    return {
      payload: {
        selectedNoteId: noteId,
      },
    };
  }
);

/**
 * NOTES_FETCH_NOTE
 */
export const NOTES_FETCH_NOTE = 'NOTES/FETCH_NOTE';
export interface FetchNoteActionPayload {
  noteId: string;
}
export const fetchNoteAction = createAsyncThunk<
  NoteDetailResult,
  FetchNoteActionPayload
>(NOTES_FETCH_NOTE, async ({ noteId }) => {
  return await getNoteByNoteId(noteId);
});
addAction(NOTES_FETCH_NOTE, fetchNoteAction);

/**
 * NOTES_FETCH_NOTES
 */
export const NOTES_FETCH_NOTES = 'NOTES/FETCH_NOTES';
export interface FetchNotesActionPayload extends NotesQueryParams {}
export const fetchNotesAction = createAsyncThunk<
  NotesResult,
  FetchNotesActionPayload
>(NOTES_FETCH_NOTES, async (fetchNotesActionPayload) => {
  const notesQueryParams = fetchNotesActionPayload;
  return await getNotes(notesQueryParams);
});
addAction(NOTES_FETCH_NOTES, fetchNotesAction);

/**
 * NOTES_DELETE
 */
export const NOTES_DELETE = 'NOTES/DELETE';
export interface DeleteNoteActionPayload {
  noteId: string;
}
export const deleteNoteAction = createAsyncThunk<
  NoteDetailResult,
  DeleteNoteActionPayload
>(NOTES_DELETE, async (payload) => {
  const { noteId } = payload;
  return await deleteNote(noteId);
});
addAction(NOTES_DELETE, deleteNoteAction);

/**
 * NOTES_CREATE
 */
export const NOTES_CREATE = 'NOTES/CREATE';
export interface CreateNoteActionPayload {
  createNoteDTO: CreateNoteDTO;
}
export const createNoteAction = createAsyncThunk<
  NoteDetailResult,
  CreateNoteActionPayload
>(NOTES_CREATE, async (payload) => {
  const { createNoteDTO } = payload;
  return await createNote(createNoteDTO);
});
addAction(NOTES_CREATE, createNoteAction);

/**
 * NOTES_UPDATE
 */
export const NOTES_UPDATE = 'NOTES/UPDATE';
export interface UpdateNoteActionPayload {
  updateNoteDTO: UpdateNoteDTO;
}
export const updateNoteActionAction = createAsyncThunk<
  NoteDetailResult,
  UpdateNoteActionPayload
>(NOTES_UPDATE, async (payload) => {
  const { updateNoteDTO } = payload;

  return await updateNote(updateNoteDTO);
});
addAction(NOTES_UPDATE, updateNoteActionAction);

/**
 * NOTES_CREATE_TAG_AND_ADD_TO_NOTE
 */
export const NOTES_CREATE_TAG_AND_ADD_TO_NOTE =
  'NOTES/CREATE_TAG_AND_ADD_TO_NOTE';
export interface CreateTagAndAddToNoteActionPayload {
  tag: Tag;
  noteActionDTO: NoteActionDTO;
}
export const createTagAndAddToNoteAction = createAsyncThunk<
  CreateTagAndAddToNoteResult,
  CreateTagAndAddToNoteActionPayload,
  {}
>(NOTES_CREATE_TAG_AND_ADD_TO_NOTE, async (payload) => {
  const { noteActionDTO } = payload;
  return await createTagAndAddToNote(noteActionDTO);
});
addAction(NOTES_CREATE_TAG_AND_ADD_TO_NOTE, createTagAndAddToNoteAction);

/**
 * NOTES_ADD_TAG_TO_NOTE
 */
export const NOTES_ADD_TAG_TO_NOTE = 'NOTES/ADD_TAG_TO_NOTE';
export interface AddTagToNoteActionPayload {
  noteActionDTO: NoteActionDTO;
  tag: Tag;
}

export const addTagToNoteAction = createAsyncThunk<
  NoteDetailResult,
  AddTagToNoteActionPayload
>(NOTES_ADD_TAG_TO_NOTE, async (payload) => {
  const { noteActionDTO, tag } = payload;
  return await addTagToNote(noteActionDTO);
});
addAction(NOTES_ADD_TAG_TO_NOTE, addTagToNoteAction);

/**
 * NOTES_REMOVE_TAG_TO_NOTE
 */
export const NOTES_REMOVE_TAG_TO_NOTE = 'NOTES/REMOVE_TAG_TO_NOTE';
export interface RemoveTagToNoteActionPayload {
  noteActionDTO: NoteActionDTO;
}
export const removeTagToNoteAction = createAsyncThunk<
  NoteDetailResult,
  RemoveTagToNoteActionPayload
>(NOTES_REMOVE_TAG_TO_NOTE, async (payload) => {
  const { noteActionDTO } = payload;
  return await removeTagToNote(noteActionDTO);
});
addAction(NOTES_REMOVE_TAG_TO_NOTE, removeTagToNoteAction);
