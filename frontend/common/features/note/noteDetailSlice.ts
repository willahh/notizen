import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNoteByNoteId, createNote, deleteNote } from '../../api/notizenAPI';
import { AppThunk } from '../../app/store';
import { INote, NoteDetailResult } from '../../interfaces/INote.interface';
import { addNote } from './noteListSlice';

interface NoteDetailState {
  isLoading: boolean;
  showLoading: boolean;
  error: string | null;
  note: INote | null;
  selectedNoteId: number | null;
}

const initialNoteDetailState: NoteDetailState = {
  isLoading: false,
  showLoading: false,
  error: null,
  note: null,
  selectedNoteId: null,
};

function startLoading(state: NoteDetailState) {
  state.isLoading = true;
  state.showLoading = false;
  // let timer1 = setTimeout(() => {
  //   state.showLoading = true;
  // }, 1000);
}

function loadingFailed(state: NoteDetailState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
  state.showLoading = false;
}

const notes = createSlice({
  name: 'noteDetail',
  initialState: initialNoteDetailState,
  reducers: {
    getNoteDetailStart: startLoading,
    getNoteDetailFailure: loadingFailed,
    getNoteDetailSuccess(
      state: NoteDetailState,
      { payload }: PayloadAction<NoteDetailResult>
    ) {
      const { note } = payload;
      state.isLoading = false;
      state.showLoading = false;
      state.error = null;
      state.note = note;
    },
    setSelectedNoteId(state: NoteDetailState, action: PayloadAction<number>) {
      console.log('setSelectedNoteId', action);

      state.selectedNoteId = action.payload;

      return state;
    },
  },
});

export const {
  getNoteDetailStart,
  getNoteDetailFailure,
  getNoteDetailSuccess,
  setSelectedNoteId,
} = notes.actions;

export default notes.reducer;

export const dispatchFetchNote = (noteId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getNoteDetailStart());
    const note = await getNoteByNoteId(noteId);
    dispatch(getNoteDetailSuccess(note));
  } catch (err) {
    dispatch(getNoteDetailFailure(err.toString()));
  }
};

export const dispatchCreateNote = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getNoteDetailStart());
    const note = await createNote();
    dispatch(getNoteDetailSuccess(note));
    dispatch(addNote(note));
  } catch (err) {
    dispatch(getNoteDetailFailure(err.toString()));
  }
};

// export const dispatchDeleteNote = (noteId: number): AppThunk => async (
//   dispatch
// ) => {
//   console.log('dispatchDeleteNote', noteId);
//   console.log('notes', notes);
//   console.log('getState()', getState());
  
  
//   try {
//     dispatch(getNoteDetailStart());
//     dispatch(deleteNoteLocal(noteId)); // Optimistic action
//     const note = await deleteNote(noteId);
//     dispatch(getNoteDetailSuccess(note));
//   } catch (err) {
//     dispatch(deleteNoteLocalRollback(noteId)); // Rollback optimistic action
//     dispatch(getNoteDetailFailure(err.toString()));
//   }
// };
