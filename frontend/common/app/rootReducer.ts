import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from '../features/note/noteListSlice';
import noteDetailReducer from '../features/note/noteDetailSlice';

const rootReducer = combineReducers({
  notes: notesReducer,
  noteDetail: noteDetailReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;