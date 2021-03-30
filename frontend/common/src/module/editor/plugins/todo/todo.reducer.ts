import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { NoteListState } from "../../../note/note.state";
import { setTodoAction, unsetTodoAction } from "./todo.action";
import { setTodo, unsetTodo } from "./todo.service";

export const TodoActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<NoteListState>
) => {
  builder

    /**
     * EDITOR_SET_TODO
     */
    .addCase(setTodoAction, (state, action) => {
      console.log('setTodoAction', action);

      const editor = window.editor; // TODO
      const nodes = setTodo(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    })

    /**
     * EDITOR_UNSET_TODO
     */
    .addCase(unsetTodoAction, (state, action) => {
      console.log('unsetTodoAction', action);

      const editor = window.editor; // TODO
      const nodes = unsetTodo(editor, action.payload.range);
      const noteId = action.payload.noteId;
      const note = state.notes[noteId];
      const updatedNote = { ...note, content: nodes };
      state.notes[noteId] = updatedNote;
    });

  return builder;
};
