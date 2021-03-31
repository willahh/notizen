import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { NoteListState } from '../note/note.state';
import { updateContentAction } from './editor.actions';
import { initialEditorState } from './editor.state';
import {} from './service/editor.action.service';

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
    });

  return builder;
};

const editor = createSlice({
  name: 'editor',
  initialState: initialEditorState,
  reducers: {},
});

export default editor.reducer;
