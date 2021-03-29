import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { NoteListState } from '../../../note/note.state';
import { setTagAction, unsetTagAction } from './tag.action';
import { setTag, unsetTag } from './tag.service';

export const tagActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_TAG
     */
    .addCase(setTagAction, (state, action) => {
      console.log('setTagAction', action);

      const editor = window.editor; // TODO
      const nodes = setTag(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_TAG
     */
    .addCase(unsetTagAction, (state, action) => {
      console.log('unsetTagAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetTag(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
