import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setBulletListAction, unsetBulletListAction } from "./bulletlist.action";
import { setBulletList, unsetBulletList } from "./bulletlist.service";

export const BulletListActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_BULLETLIST
     */
    .addCase(setBulletListAction, (state, action) => {
      console.log('setBulletListAction', action);

      const editor = window.editor; // TODO
      const nodes = setBulletList(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_BULLETLIST
     */
    .addCase(unsetBulletListAction, (state, action) => {
      console.log('unsetBulletListAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetBulletList(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
