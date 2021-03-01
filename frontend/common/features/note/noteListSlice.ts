import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import {
  createNote,
  deleteNote,
  getNoteByNoteId,
  getNotes,
  updateNote,
} from '../../api/notizenAPI';
import {
  INote,
  NoteDetailResult,
  UpdateNoteDTO,
  CreateNoteDTO,
} from '../../interfaces/INote.interface';
import { LOCAL_STORAGE_NOTES_KEY } from '../../constants';
import { Notes } from '../../interfaces/INote.interface';

// TODO: See https://codesandbox.io/s/ihttc?file=/src/app/store.ts
// and https://github.com/jerrynavi/diaries-app/tree/master/src/features

interface NoteListState {
  isLoading: boolean;
  error: string | null;
  notes: Notes;
  notesCache: Notes;
  selectedNoteId: string | null;
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
  async (noteId: string) => {
    console.log('fetchNote', noteId);
    return await getNoteByNoteId(noteId);
  }
);

export const fetchNotes = createAsyncThunk('notes/fetch', async (thunkAPI) => {
  return await getNotes();
});

export const deleteNoteThunk = createAsyncThunk(
  'notes/delete',
  async (noteId: string) => {
    console.log('deleteNote new');
    return await deleteNote(noteId);
  }
);

export const createNoteThunk = createAsyncThunk(
  'notes/create',
  async (createNoteDTO: CreateNoteDTO) => {
    console.log('createNoteThunk', createNoteDTO);
    return await createNote(createNoteDTO);
  }
);

export const updateNoteThunk = createAsyncThunk(
  'notes/update',
  async ({ noteId, updateNoteDTO: UpdateNoteDTO, serverSync }: any) => {
    console.log('updateNoteThunk', noteId, UpdateNoteDTO, serverSync);
    if (serverSync) {
      return await updateNote(noteId, UpdateNoteDTO);
    } else {
      var noteDetailResultPromise: Promise<NoteDetailResult> = new Promise(
        (resolve, reject) => {
          note: UpdateNoteDTO;
        }
      );
      return noteDetailResultPromise;
    }
  }
);

const notes = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  extraReducers: (builder) => {
    builder
      // setSelectedNoteId ------------------
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
        state.error = null;

        const noteId = action.meta.arg;
        const note = state.notesCache[noteId];
        const newNotes = { ...state.notes, [noteId]: note };
        state.notes = newNotes;
        state.notesCache = newNotes;
      })
      .addCase(fetchNoteThunk.fulfilled, (state, action) => {
        console.log('fetchNote.fulfilled', state, action);
        const noteId = action.meta.arg;
        const note = action.payload.note;
        const newNotes = { ...state.notes, [noteId]: note };
        state.notes = newNotes;
        state.notesCache = newNotes;
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
        var notes = action.payload.notes;
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

        // 02
        // const noteIdTemp = 'temp-' + action.meta.requestId;
        // const newNote = {
        //   ...action.meta.arg,
        //   id: noteIdTemp,
        //   createDate: new Date(),
        //   updateDate: new Date(),
        // };
        // const newNotes = { ...state.notes, [noteIdTemp]: newNote };
        // state.notes = newNotes;
        // state.notesCache = newNotes;
      })
      .addCase(createNoteThunk.fulfilled, (state, action) => {
        console.log('createNoteThunk.fulfilled', state, action);

        // 01
        // const noteIdTemp = 'temp-' + action.meta.requestId;
        // const newNote = action.payload.note;
        // const newNotes = { ...state.notes, [noteIdTemp]: newNote };

        // state.notes = newNotes;
        // state.notesCache = newNotes;

        // 02
        // const noteIdTemp = 'temp-' + action.meta.requestId;
        // const newNotesA = { ...state.notes };
        // delete newNotesA[noteIdTemp];

        // const newNote = action.payload.note;
        // const newNotes = { ...newNotesA, [newNote.id]: newNote };

        // state.notes = newNotes;
        // state.notesCache = newNotes;

        const newNote = action.payload.note;
        const newNotes = { ...state.notes, [newNote.id]: newNote };

        state.notes = newNotes;
        state.notesCache = newNotes;
        state.selectedNoteId = newNote.id;
      })
      .addCase(createNoteThunk.rejected, (state, action) => {
        console.log('createNoteThunk.rejected', state, action);

        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        const noteId = 99999999999;
        const newNotes = { ...state.notes };
        delete newNotes[noteId];

        state.notes = newNotes;
        state.notesCache = newNotes;
      })

      // updateNote ----------------------
      .addCase(updateNoteThunk.pending, (state, action) => {
        console.log('updateNoteThunk.pending', state, action);

        // Optimistic rendering
        const noteId = action.meta.arg.noteId;
        const note = state.notes[noteId];
        const newNote = {
          ...note,
          ...action.meta.arg.updateNoteDTO,
          noteId: noteId,
        }; // TODO: add types
        const newNotes = { ...state.notes, [noteId]: newNote };

        state.notes = newNotes;
        state.notesCache = newNotes;
      })
      .addCase(updateNoteThunk.fulfilled, (state, action) => {
        console.log('updateNoteThunk.fulfilled', state, action);

        const noteId = action.payload.note.id;
        const newNotes = { ...state.notes, [noteId]: action.payload.note };

        state.notes = newNotes;
        state.notesCache = newNotes;
      })
      .addCase(updateNoteThunk.rejected, (state, action) => {
        console.log('updateNoteThunk.rejected', state, action);

        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        const noteId = action.meta.arg.noteId;
        const noteCached = state.notesCache[noteId];
        const newNotes = { ...state.notes, [noteId]: noteCached };

        state.notes = newNotes;
        state.notesCache = newNotes;
      })

      // deleteNote ----------------------
      .addCase(deleteNoteThunk.pending, (state, action) => {
        console.log('deleteNoteThunk.pending', state, action);

        const noteId = action.meta.arg;
        const newNotes = { ...state.notes };
        delete newNotes[noteId];

        state.notes = newNotes;
        state.notesCache = newNotes;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        console.log('deleteNoteThunk.fulfilled', state, action);

        // return state;
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
        console.log('deletNoteThunk.rejected', state, action);

        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        const noteId = action.meta.arg;
        const noteCached = state.notesCache[noteId];
        const newNotes = { ...state.notes, [noteId]: noteCached };

        state.notes = newNotes;
        state.notesCache = newNotes;
      });
  },
  reducers: {},
});

export default notes.reducer;
