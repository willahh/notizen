import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNotes } from '../../api/notizenAPI';
import { AppThunk } from '../../app/store';
import { INote, NotesResult } from '../../interfaces/INote.interface';

// TODO: See https://codesandbox.io/s/ihttc?file=/src/app/store.ts
// and https://github.com/jerrynavi/diaries-app/tree/master/src/features

interface NotesState {
  isLoading: boolean;
  error: string | null;
  notes: INote[];
}

const initialNotesState: NotesState = {
  isLoading: false,
  error: null,
  notes: [],
};

function startLoading(state: NotesState) {
  state.isLoading = true;
}

function loadingFailed(state: NotesState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const notes = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  reducers: {
    getNotesStart: startLoading,
    getNotesFailure: loadingFailed,
    getNotesSuccess(
      state: NotesState,
      { payload }: PayloadAction<NotesResult>
    ) {
      const { notes } = payload;
      state.isLoading = false;
      state.error = null;
      state.notes = notes;
    },
  },
});

export const {
  getNotesFailure,
  getNotesStart,
  getNotesSuccess,
} = notes.actions;

export default notes.reducer;

export const fetchNotes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getNotesStart());
    const notes = await getNotes();
    dispatch(getNotesSuccess(notes));
  } catch (err) {
    dispatch(getNotesFailure(err.toString()));
  }
};