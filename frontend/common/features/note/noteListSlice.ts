import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import { createNote, deleteNote, getNoteByNoteId, getNotes } from '../../api/notizenAPI';
import { INote, NoteDetailResult } from '../../interfaces/INote.interface';
import { LOCAL_STORAGE_NOTES_KEY } from '../../constants';

// TODO: See https://codesandbox.io/s/ihttc?file=/src/app/store.ts
// and https://github.com/jerrynavi/diaries-app/tree/master/src/features

// Types
interface Notes {
  [key: string]: INote;
}

interface NoteListState {
  isLoading: boolean;
  error: string | null;
  notes: Notes;
  notesCache: Notes;
  selectedNoteId: number | null;
}

export interface NotesResult {
  notes: Notes;
}

const getNotesFromLocalStorage = () => {
  const localStorageData = window.localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
  return localStorageData ? JSON.parse(localStorageData) : {};
};
const notesInitialData = getNotesFromLocalStorage();

const initialNotesState: NoteListState = {
  isLoading: false,
  error: null,
  notes: notesInitialData,
  notesCache: notesInitialData,
  selectedNoteId: null,
};

function loadingFailed(state: NoteListState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

export const setSelectedNoteId = createAction(
  'notes/setSelectedNoteId',
  (noteId: number) => {
    return {
      payload: {
        selectedNoteId: noteId,
      },
    };
  }
);

export const fetchNoteThunk = createAsyncThunk(
  'notes/note',
  async (noteId: number, thunkAPI) => {
    console.log('fetchNote', noteId);
    return await getNoteByNoteId(noteId);
  }
);

export const fetchNotes = createAsyncThunk('notes/fetch', async (thunkAPI) => {
  return await getNotes();
});

export const deleteNoteThunk = createAsyncThunk(
  'notes/delete',
  async (noteId: number, thunkAPI) => {
    console.log('deleteNote new', thunkAPI);

    return await deleteNote(noteId);
  }
);

export const createNoteThunk = createAsyncThunk(
  'notes/create',
  async (thunkAPI) => {
    console.log('createNoteThunk');
    return await createNote();
  }
);

const notes = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedNoteId, (state, action) => {
        console.log('setSelectedNoteId', action);
        console.log(
          'action.payload.selectedNoteId',
          action.payload.selectedNoteId
        );

        state.selectedNoteId = action.payload.selectedNoteId;
      })

      // fetchNote ------------------
      .addCase(fetchNoteThunk.pending, (state, action) => {
        console.log('fetchNote.pending');
        // state.isLoading = true;
        state.error = null;

        const noteId = action.meta.arg;
        const note = state.notesCache[noteId];
        // state.isLoading = false;
        state.notes = { ...state.notes, [noteId]: note };
      })
      .addCase(fetchNoteThunk.fulfilled, (state, action) => {
        console.log('fetchNote.fulfilled', state, action);
        const noteId = action.meta.arg;
        const note = action.payload.note;
        state.notes = { ...state.notes, [noteId]: note };
      })
      .addCase(fetchNoteThunk.rejected, (state, action) => {
        console.log('# fetchNote.rejected', state, action);

        // TODO: Need fallback to this optimistic rendering
        // state.isLoading = false;
        // state.error = action.error.message;
      })
 
      // fetchNotes ----------------------
      .addCase(fetchNotes.pending, (state, action) => {
        console.log('# fetchNotes.pending', state, action);

        if (Object.keys(state.notes).length === 0) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        console.log('# fetchNotes.fulfilled', state, action);

        state.isLoading = false;
        state.error = null;
        var notes = action.payload.notes.reduce(function (map, obj) {
          map[obj.id] = obj;
          return map;
        }, {});
        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        console.log('# fetchNotes.rejected', state, action);

        state.isLoading = false;
        // state.error = action.error.message;
      })

      // createNote ----------------------
      .addCase(createNoteThunk.pending, (state, action) => {
        console.log('createNoteThunk.pending', state, action);
      })
      .addCase(createNoteThunk.fulfilled, (state, action) => {
        console.log('createNoteThunk.fulfilled', state, action);
      })

      // deleteNote ----------------------
      .addCase(deleteNoteThunk.pending, (state, action) => {
        console.log('# deleteNoteThunk.pending', state, action);

        var noteId = action.meta.arg;
        const newNotes = { ...state.notes };
        delete newNotes[noteId];
        state.notes = newNotes;
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
        console.log('# deletNoteThunk.rejected', state, action);

        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        var noteId = action.meta.arg;
        var noteCached = state.notesCache[noteId];
        state.notes = { ...state.notes, [noteId]: noteCached };
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        console.log('# extraReducers deleteNoteThunk.fulfilled', state, action);

        return state;
      });
  },
  reducers: {
    addNote(
      state: NoteListState,
      { payload }: PayloadAction<NoteDetailResult>
    ) {
      console.log('addNote', payload);

      const { note } = payload;

      state.notes[note.id] = note;
    },
  },
});

export const { addNote } = notes.actions;
export default notes.reducer;
