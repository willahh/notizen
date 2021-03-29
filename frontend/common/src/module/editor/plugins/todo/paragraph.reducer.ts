import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setParagraphAction, unsetParagraphAction } from "./todo.action";
import { setParagraph, unsetParagraph } from "./todo.service";

export const ParagraphActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_PARAGRAPH
     */
    .addCase(setParagraphAction, (state, action) => {
      console.log('setParagraphAction', action);

      const editor = window.editor; // TODO
      const nodes = setParagraph(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_PARAGRAPH
     */
    .addCase(unsetParagraphAction, (state, action) => {
      console.log('unsetParagraphAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetParagraph(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
