import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from '../features/note/noteListSlice';
import tagsReducer from './../features/tags/TagsSlice'; // TODO: case => tagsSlice

const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
