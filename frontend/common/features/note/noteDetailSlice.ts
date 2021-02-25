import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNoteByNoteId, getNotes } from '../../api/notizenAPI';
import { AppThunk } from '../../app/store';
import { INote, NoteDetailResult } from '../../interfaces/INote.interface';

interface NoteDetailState {
  isLoading: boolean;
  showLoading: boolean,
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
    }
  },
});

export const {
  getNoteDetailStart,
  getNoteDetailFailure,
  getNoteDetailSuccess,
  setSelectedNoteId,
} = notes.actions;

export default notes.reducer;

export const fetchNote = (noteId: number): AppThunk => async (dispatch) => {
  try {
    dispatch(getNoteDetailStart());
    const note = await getNoteByNoteId(noteId);
    dispatch(getNoteDetailSuccess(note));
  } catch (err) {
    dispatch(getNoteDetailFailure(err.toString()));
  }
};