import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setNumberedListAction, unsetNumberedListAction } from "./numberedlist.action";
import { setNumberedList, unsetNumberedList } from "./numberedlist.service";

export const NumberedListActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_NUMBEREDLIST
     */
    .addCase(setNumberedListAction, (state, action) => {
      console.log('setNumberedListAction', action);

      const editor = window.editor; // TODO
      const nodes = setNumberedList(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_NUMBEREDLIST
     */
    .addCase(unsetNumberedListAction, (state, action) => {
      console.log('unsetNumberedListAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetNumberedList(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
