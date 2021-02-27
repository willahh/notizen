import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from '../features/note/noteListSlice';

const rootReducer = combineReducers({
  notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;