import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setHeadingOneAction, unsetHeadingOneAction } from "./headingone.action";
import { setHeadingOne, unsetHeadingOne } from "./headingone.service";

export const headingOneActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_HEADINGONE
     */
    .addCase(setHeadingOneAction, (state, action) => {
      console.log('setHeadingOneAction', action);

      const editor = window.editor; // TODO
      const nodes = setHeadingOne(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_HEADINGONE
     */
    .addCase(unsetHeadingOneAction, (state, action) => {
      console.log('unsetHeadingOneAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetHeadingOne(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
