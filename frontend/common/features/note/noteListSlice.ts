import {
  createSlice,
  createAction,
  PayloadAction,
  createAsyncThunk,
  CaseReducer
} from '@reduxjs/toolkit';
import { ReducerAction } from 'react';
import { deleteNote, getNotes } from '../../api/notizenAPI';
import { AppThunk } from '../../app/store';
import {
  INote,
  NoteDetailResult,
  NotesResult,
} from '../../interfaces/INote.interface';

// TODO: See https://codesandbox.io/s/ihttc?file=/src/app/store.ts
// and https://github.com/jerrynavi/diaries-app/tree/master/src/features

interface NoteListState {
  isLoading: boolean;
  error: string | null;
  notes: INote[];
  selectedNoteId: number | null;
  previousState: NoteListState
}

const initialNotesState: NoteListState = {
  isLoading: false,
  error: null,
  notes: [],
  selectedNoteId: null,
  previousState: null
};

function startLoading(state: NoteListState) {
  state.isLoading = true;
}

function loadingFailed(state: NoteListState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

export const deleteNoteThunk = createAsyncThunk(
  'notes/delete',
  async (noteId: number, thunkAPI) => {
    console.log('deleteNote new', thunkAPI);
    
    return await deleteNote(noteId);
  }
);

const notes = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteNoteThunk.pending, (state, action) => {
        console.log('# deleteNoteThunk.pending', state, action);
        var noteId = action.meta.arg;
        return {
          ...state,
          previousState: {...state},
          notes: [...state.notes.filter((item) => item.id !== noteId)],
        };
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
        console.log('# deletNoteThunk.rejected', state, action);
        
        // Rollback
        return {
          ...state,
          notes: state.previousState.notes
        }
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        console.log('# extraReducers deleteNoteThunk.fulfilled', state, action);

        return state;
      });
  },
  reducers: {
    getNotesStart: startLoading,
    getNotesFailure: loadingFailed,
    getNotesSuccess(
      state: NoteListState,
      { payload }: PayloadAction<NotesResult>
    ) {
      const { notes } = payload;
      state.isLoading = false;
      state.error = null;
      state.notes = notes;
    },
    addNote(
      state: NoteListState,
      { payload }: PayloadAction<NoteDetailResult>
    ) {
      console.log('addNote', payload);

      const { note } = payload;
      state.notes.push(note);
    },
    getState(state: NoteListState) {
      return { ...state };
    },
  },
});

export const {
  getNotesFailure,
  getNotesStart,
  getNotesSuccess,
  addNote,
  getState,
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
