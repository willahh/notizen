import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setBlockQuoteAction, unsetBlockQuoteAction } from "./blockquote.action";
import { setBlockQuote, unsetBlockQuote } from "./blockquote.service";

export const blockQuoteActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_BLOCKQUOTE
     */
    .addCase(setBlockQuoteAction, (state, action) => {
      console.log('setBlockQuoteAction', action);

      const editor = window.editor; // TODO
      const nodes = setBlockQuote(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_BLOCKQUOTE
     */
    .addCase(unsetBlockQuoteAction, (state, action) => {
      console.log('unsetBlockQuoteAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetBlockQuote(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
