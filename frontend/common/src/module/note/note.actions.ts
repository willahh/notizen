import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  createNote,
  deleteNote,
  getNoteByNoteId,
  getNotes,
  createTagAndAddToNote,
  updateNote,
  addTagToNote,
  removeTagToNote,
} from '../../notizenAPI';
import {
  NoteDetailResult,
  CreateNoteDTO,
  UpdateNoteDTO,
  NoteActionDTO,
  Tag,
  NotesResult,
  CreateTagAndAddToNoteResult,
} from '../../interfaces';
import { addAction } from '../../actions';

/**
 * notes/setSelectedNoteId
 */
let actionName: string = '';

actionName = 'notes/setSelectedNoteId';
export interface SetSelectedNoteIdActionPayload {
  noteId?: string;
}
export const setSelectedNoteIdAction = createAction(
  actionName,
  (payload: SetSelectedNoteIdActionPayload) => {
    const noteId = payload.noteId;
    return {
      payload: {
        selectedNoteId: noteId,
      },
    };
  }
);
addAction(actionName, setSelectedNoteIdAction);

/**
 * notes/note
 */
actionName = 'notes/note';
export interface FetchNoteActionPayload {
  noteId: string;
}
export const fetchNoteAction = createAsyncThunk<
  NoteDetailResult,
  FetchNoteActionPayload
>(actionName, async ({ noteId }) => {
  return await getNoteByNoteId(noteId);
});
addAction(actionName, fetchNoteAction);

/**
 * notes/fetch
 */
actionName = 'notes/fetch';
export interface FetchNotesActionPayload {}
export const fetchNotesAction = createAsyncThunk<
  NotesResult,
  FetchNotesActionPayload
>(actionName, async () => {
  return await getNotes();
});
addAction(actionName, fetchNotesAction);

/**
 * notes/delete
 */
actionName = 'notes/delete';
export interface DeleteNoteActionPayload {
  noteId: string;
}
export const deleteNoteAction = createAsyncThunk<
  NoteDetailResult,
  DeleteNoteActionPayload
>(actionName, async (payload) => {
  const { noteId } = payload;
  return await deleteNote(noteId);
});
addAction(actionName, deleteNoteAction);

/**
 * notes/create
 */
actionName = 'notes/create';
export interface CreateNoteActionPayload {
  createNoteDTO: CreateNoteDTO;
}
export const createNoteAction = createAsyncThunk<
  NoteDetailResult,
  CreateNoteActionPayload
>(actionName, async (payload) => {
  const { createNoteDTO } = payload;
  return await createNote(createNoteDTO);
});
addAction(actionName, createNoteAction);

/**
 * notes/update
 */
actionName = 'notes/update';
export interface UpdateNoteActionPayload {
  updateNoteDTO: UpdateNoteDTO;
}
export const updateNoteActionAction = createAsyncThunk<
  NoteDetailResult,
  UpdateNoteActionPayload
>(actionName, async (payload) => {
  const { updateNoteDTO } = payload;

  return await updateNote(updateNoteDTO);
});
addAction(actionName, updateNoteActionAction);

/**
 * notes/createTagAndAddToNote
 */
actionName = 'notes/createTagAndAddToNote';
export interface CreateTagAndAddToNoteActionPayload {
  noteActionDTO: NoteActionDTO;
}
export const createTagAndAddToNoteAction = createAsyncThunk<
  CreateTagAndAddToNoteResult,
  CreateTagAndAddToNoteActionPayload,
  {}
>(actionName, async (payload) => {
  const { noteActionDTO } = payload;
  return await createTagAndAddToNote(noteActionDTO);
});
addAction(actionName, createTagAndAddToNoteAction);

/**
 * notes/addTagToNoteAction
 */
actionName = 'notes/addTagToNoteAction';
export interface AddTagToNoteActionPayload {
  noteActionDTO: NoteActionDTO;
  tag: Tag;
}
export const addTagToNoteAction = createAsyncThunk<
  NoteDetailResult,
  AddTagToNoteActionPayload
>(actionName, async (payload) => {
  const { noteActionDTO, tag } = payload;
  return await addTagToNote(noteActionDTO);
});
addAction(actionName, addTagToNoteAction);

/**
 * notes/removeTagToNoteAction
 */
actionName = 'notes/removeTagToNoteAction';
export interface RemoveTagToNoteActionPayload {
  noteActionDTO: NoteActionDTO;
}
export const removeTagToNoteAction = createAsyncThunk<
  NoteDetailResult,
  RemoveTagToNoteActionPayload
>(actionName, async (payload) => {
  const { noteActionDTO } = payload;
  return await removeTagToNote(noteActionDTO);
});
addAction(actionName, removeTagToNoteAction);
