import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
// import { WritableDraft } from 'immer/dist/internal';
import { NoteListState } from '../note/note.state';
import {
  setBoldAction,
  unsetBoldAction,
  updateContentAction,
} from './editor.actions';
import {
  setBold,
  unsetBold,
} from './service/editor.action.service';
import { initialEditorState } from './editor.state';

declare global {
  interface Window {
    store: any; // TODO: Debug
    requestPending: any; // TODO: Debug
    _event: any; // TODO: Debug
  }
}

type UpdateNoteContentAction = {
  payload: any;
  type?: string;
};
const updateNoteContent = (
  // state: WritableDraft<NoteListState>,
  state: NoteListState,
  action: UpdateNoteContentAction
) => {
  const noteId = action.payload.noteId;
  const nodes = action.payload.nodes;
  const note = state.notes[noteId];
  const updatedNote = { ...note, content: nodes };
  return updatedNote;
};

/**
 * Returns an actionReducerMapBuilder that can be merged from another reducer.
 * This is the way i found to have separate reducers who share the same state (note.state).
 */
export const withEditorActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder
    /**
     * EDITOR_UPDATE_CONTENT
     */
    .addCase(updateContentAction, (state, action) => {
      console.log('updateContentAction', action);

      const noteId = action.payload.noteId;
      const updatedNote = updateNoteContent(state, action);
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_SET_BOLD
     */
    .addCase(setBoldAction, (state, action) => {
      console.log('setBoldAction', action);

      const editor = window.editor; // TODO
      const nodes = setBold(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_BOLD
     */
    .addCase(unsetBoldAction, (state, action) => {
      console.log('unsetBoldAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetBold(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })


  return builder;
};

const editor = createSlice({
  name: 'editor',
  initialState: initialEditorState,
  reducers: {},
});

export default editor.reducer;
