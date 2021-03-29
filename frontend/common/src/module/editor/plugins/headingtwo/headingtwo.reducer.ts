import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setHeadingTwoAction, unsetHeadingTwoAction } from "./headingtwo.action";
import { setHeadingTwo, unsetHeadingTwo } from "./headingtwo.service";

export const headingTwoActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_HEADINGTWO
     */
    .addCase(setHeadingTwoAction, (state, action) => {
      console.log('setHeadingTwoAction', action);

      const editor = window.editor; // TODO
      const nodes = setHeadingTwo(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_HEADINGTWO
     */
    .addCase(unsetHeadingTwoAction, (state, action) => {
      console.log('unsetHeadingTwoAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetHeadingTwo(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
