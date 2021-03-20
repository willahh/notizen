import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from './../module/note/note.reducer';
import tagsReducer from './../module/tags/tags.reducer';
import editorReducer from './../module/editor/editor.reducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
