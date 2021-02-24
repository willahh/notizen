import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from '../features/NoteList/noteSlice';

const rootReducer = combineReducers({
  notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;