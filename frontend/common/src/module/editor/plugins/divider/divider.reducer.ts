import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setDividerAction, unsetDividerAction } from "./divider.action";
import { setDivider, unsetDivider } from "./divider.service";

export const DividerActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_DIVIDER
     */
    .addCase(setDividerAction, (state, action) => {
      console.log('setDividerAction', action);

      const editor = window.editor; // TODO
      const nodes = setDivider(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_DIVIDER
     */
    .addCase(unsetDividerAction, (state, action) => {
      console.log('unsetDividerAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetDivider(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
