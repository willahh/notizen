import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setCodeAction, unsetCodeAction } from "./code.action";
import { setCode, unsetCode } from "./code.service";

export const codeActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_CODE
     */
    .addCase(setCodeAction, (state, action) => {
      console.log('setCodeAction', action);

      const editor = window.editor; // TODO
      const nodes = setCode(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_CODE
     */
    .addCase(unsetCodeAction, (state, action) => {
      console.log('unsetCodeAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetCode(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
