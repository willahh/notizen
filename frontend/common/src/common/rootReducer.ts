import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from './../module/note/note.reducer';
import tagsReducer from './../module/tags/tags.reducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
