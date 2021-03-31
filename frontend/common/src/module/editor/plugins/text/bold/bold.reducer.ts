import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../../note/note.state";
import { setBoldAction, unsetBoldAction } from "./bold.action";
import { setBold, unsetBold } from "./bold.service";

export const BoldActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

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
    });

  return builder;
};
