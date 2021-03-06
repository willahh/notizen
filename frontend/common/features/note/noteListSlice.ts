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
  createTagAndAddToNote,
  updateNote,
  addTagToNote,
  removeTagToNote,
} from '../../api/notizenAPI';
import {
  NoteDetailResult,
  CreateNoteDTO,
  UpdateNoteDTO,
  NoteActionDto,
  INote,
  Tag,
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

const getNotesFromLocalStorage = () => {
  const localStorageData = window.localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
  return localStorageData ? JSON.parse(localStorageData) : {};
};
const notesInitialData = getNotesFromLocalStorage();

export const initialNotesState: NoteListState = {
  isLoading: false,
  error: null,
  notes: notesInitialData,
  notesCache: notesInitialData,
  selectedNoteId: null,
};

export const setSelectedNoteId = createAction(
  'notes/setSelectedNoteId',
  (noteId: string) => {
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
    // return await getNoteByNoteId(noteId);
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

export const addNoteLocalAction = createAction(
  'tags/addNoteLocalAction',
  (note: INote) => {
    return {
      payload: {
        note: note,
      },
    };
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

export const createTagAndAddToNoteAction = createAsyncThunk(
  'notes/createTagAndAddToNote',
  async (noteActionDTO: NoteActionDto) => {
    return await createTagAndAddToNote(noteActionDTO);
  }
);

interface AddTagToNoteAction {
  noteActionDTO: NoteActionDto,
  tag: Tag
}
export const addTagToNoteAction = createAsyncThunk(
  'notes/addTagToNoteAction',
  async ({noteActionDTO, tag}: AddTagToNoteAction) => {
    console.log('##addTagToNoteAction');
    
    return await addTagToNote(noteActionDTO);
  }
);

interface RemoveTagToNoteAction {
  noteActionDTO: NoteActionDto,
  tag: Tag
}
export const removeTagToNoteAction = createAsyncThunk(
  'notes/removeTagToNoteAction',
  async ({noteActionDTO, tag}: RemoveTagToNoteAction) => {
    console.log('removeTagToNoteAction');
    return await removeTagToNote(noteActionDTO);
  }
);

const notes = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  extraReducers: (builder) => {
    builder
      // setSelectedNoteId
      .addCase(setSelectedNoteId, (state, action) => {
        console.log('setSelectedNoteId', action);
        console.log(
          'action.payload.selectedNoteId',
          action.payload.selectedNoteId
        );

        state.selectedNoteId = action.payload.selectedNoteId;
      })

      // fetchNoteThunk
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
        console.log('# fetchNote.rejected', action);

        // TODO: Need fallback to this optimistic rendering
        // state.isLoading = false;
        // state.error = action.error.message;
      })

      // fetchNotes
      .addCase(fetchNotes.pending, (state, action) => {
        console.log('# fetchNotes.pending', action);

        if (Object.keys(state.notes).length === 0) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        console.log('# fetchNotes.fulfilled', action);

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

      // createNoteThunk
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

      // addNoteLocalAction
      .addCase(addNoteLocalAction, (state, action) => {
        console.log('addNoteLocalAction', state, action);

        const note = action.payload.note;
        const noteId = note.id;
        state.notes[noteId] = note;
      })

      // updateNoteThunk
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

      // deleteNoteThunk
      .addCase(deleteNoteThunk.pending, (state, action) => {
        console.log('deleteNoteThunk.pending', state, action);

        const noteId = action.meta.arg;
        const newNotes = { ...state.notes };
        delete newNotes[noteId];

        state.notes = newNotes;
        state.notesCache = newNotes;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        console.log('deleteNoteThunk.fulfilled', action);

        // return state;
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
        console.log('deletNoteThunk.rejected', action);

        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        const noteId = action.meta.arg;
        const noteCached = state.notesCache[noteId];
        const newNotes = { ...state.notes, [noteId]: noteCached };

        state.notes = newNotes;
        state.notesCache = newNotes;
      })

      // createTagAndAddToNoteAction
      .addCase(createTagAndAddToNoteAction.pending, (state, action) => {
        console.log('createTagAndAddToNoteAction.pending', action);
      })
      .addCase(createTagAndAddToNoteAction.fulfilled, (state, action) => {
        console.log('createTagAndAddToNoteAction.fulfilled', action);

        // Add tag to tags state
        const tag = action.payload.tag;
        const tagId = tag.id;
        console.error('TODO');
        // TODO
        // state.tags[tagId] = tag;
        // state.tagsCache[tagId] = tag;
      })
      .addCase(createTagAndAddToNoteAction.rejected, (state, action) => {
        console.log('createTagAndAddToNoteAction.rejected', action);
      })

      // addTagToNoteAction
      .addCase(addTagToNoteAction.pending, (state, action) => {
        console.log('addTagToNoteAction.pending', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const tag = action.meta.arg.tag;
        const note = state.notes[noteId];

        note.tags.push(tag);
        state.notes[noteId] = note;
      })
      .addCase(addTagToNoteAction.fulfilled, (state, action) => {
        console.log('addTagToNoteAction.fulfilled', action);

        const note = action.payload.note;
        const noteId = note.id;

        state.notes[noteId] = note;
        state.notesCache[noteId] = note;
      })
      .addCase(addTagToNoteAction.rejected, (state, action) => {
        console.log('addTagToNoteAction.rejected', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const note = state.notesCache[noteId];
        
        state.notes[noteId] = note;
      })

      // removeTagToNoteAction
      .addCase(removeTagToNoteAction.pending, (state, action) => {
        console.log('removeTagToNoteAction.pending', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const tagId = action.meta.arg.tag.id;
        const note = state.notes[noteId];
        delete note.tags[tagId];

        state.notes[noteId] = note;
      })
      .addCase(removeTagToNoteAction.fulfilled, (state, action) => {
        console.log('removeTagToNoteAction.fulfilled', action);

        const note = action.payload.note;
        const noteId = note.id;
        state.notes[noteId] = note;
        state.notesCache[noteId] = note;
      })
      .addCase(removeTagToNoteAction.rejected, (state, action) => {
        console.log('removeTagToNoteAction.rejected', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const note = state.notesCache[noteId];

        state.notes[noteId] = note;
      });
  },
  reducers: {},
});

export default notes.reducer;
