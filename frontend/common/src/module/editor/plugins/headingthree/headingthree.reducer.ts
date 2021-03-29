import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setHeadingThreeAction, unsetHeadingThreeAction } from "./headingthree.action";
import { setHeadingThree, unsetHeadingThree } from "./headingthree.service";

export const headingThreeActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_HEADINGTHREE
     */
    .addCase(setHeadingThreeAction, (state, action) => {
      console.log('setHeadingThreeAction', action);

      const editor = window.editor; // TODO
      const nodes = setHeadingThree(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_HEADINGTHREE
     */
    .addCase(unsetHeadingThreeAction, (state, action) => {
      console.log('unsetHeadingThreeAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetHeadingThree(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
