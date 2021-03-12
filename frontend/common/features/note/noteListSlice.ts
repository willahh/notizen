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
  NoteColor,
  TagEntity,
  TagColor,
  TagIcon,
  Mode,
  NotesResult,
  CreateTagAndAddToNoteResult,
} from '../../interfaces/INote.interface';
import { addAction, getAction } from './../../app/actions';
import { LOCAL_STORAGE_NOTES_KEY } from '../../constants';
import { Notes } from '../../interfaces/INote.interface';

// TODO: See https://codesandbox.io/s/ihttc?file=/src/app/store.ts
// and https://github.com/jerrynavi/diaries-app/tree/master/src/features

interface NoteListState {
  isLoading: boolean;
  error: string | null;
  notes: Notes;
  notesCache: Notes;
  selectedNoteId?: string;
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
  selectedNoteId: undefined,
};

let actionName: string = '';

actionName = 'notes/setSelectedNoteId';
export interface SetSelectedNoteIdActionPayload {
  noteId?: string;
}
export const setSelectedNoteIdAction = createAction(
  actionName,
  (payload: SetSelectedNoteIdActionPayload) => {
    const noteId = payload.noteId;
    return {
      payload: {
        selectedNoteId: noteId,
      },
    };
  }
);
addAction(actionName, setSelectedNoteIdAction);

actionName = 'notes/note';
export interface FetchNoteActionPayload {
  noteId: string;
}
export const fetchNoteAction = createAsyncThunk<
  NoteDetailResult,
  FetchNoteActionPayload
>(actionName, async ({ noteId }) => {
  console.log('[x] fetchNoteAction', noteId);
  return await getNoteByNoteId(noteId);
});
addAction(actionName, fetchNoteAction);

actionName = 'notes/fetch';
export interface FetchNotesActionPayload {}
export const fetchNotesAction = createAsyncThunk<
  NotesResult,
  FetchNotesActionPayload
>(actionName, async () => {
  return await getNotes();
});
addAction(actionName, fetchNotesAction);

actionName = 'notes/delete';
export interface DeleteNoteActionPayload {
  noteId: string;
}
export const deleteNoteAction = createAsyncThunk<
  NoteDetailResult,
  DeleteNoteActionPayload
>(actionName, async (payload) => {
  const { noteId } = payload;
  return await deleteNote(noteId);
});
addAction(actionName, deleteNoteAction);

actionName = 'notes/create';
export interface CreateNoteActionPayload {
  createNoteDTO: CreateNoteDTO;
}
export const createNoteAction = createAsyncThunk<
  NoteDetailResult,
  CreateNoteActionPayload
>(actionName, async (payload) => {
  const { createNoteDTO } = payload;
  return await createNote(createNoteDTO);
});
addAction(actionName, createNoteAction);

actionName = 'tags/addNoteLocalAction';
export interface AddNoteLocalActionPayload {
  note: INote;
}
export const addNoteLocalAction = createAction(
  actionName,
  (payload: AddNoteLocalActionPayload) => {
    const { note } = payload;
    return {
      payload: {
        note: note,
      },
    };
  }
);
addAction(actionName, addNoteLocalAction);

actionName = 'notes/update';
export interface UpdateNoteActionActionPayload {
  noteId?: string;
  updateNoteDTO: UpdateNoteDTO;
  serverSync: boolean; // TODO: remove
}
export const updateNoteActionAction = createAsyncThunk<
  NoteDetailResult,
  UpdateNoteActionActionPayload
>(actionName, async (payload) => {
  const { noteId, serverSync, updateNoteDTO } = payload;

  if (serverSync) {
    // TODO: noticeId => UUID
    return await updateNote(Number(noteId), updateNoteDTO);
  } else {
    var noteDetailResultPromise: Promise<NoteDetailResult> = new Promise(
      (resolve, reject) => {
        note: updateNoteDTO;
      }
    );
    return noteDetailResultPromise;
  }
});
addAction(actionName, updateNoteActionAction);

actionName = 'notes/createTagAndAddToNote';
export interface CreateTagAndAddToNoteActionPayload {
  noteActionDTO: NoteActionDto;
}
export const createTagAndAddToNoteAction = createAsyncThunk<
  CreateTagAndAddToNoteResult,
  CreateTagAndAddToNoteActionPayload,
  {}
>(actionName, async (payload) => {
  const { noteActionDTO } = payload;
  return await createTagAndAddToNote(noteActionDTO);
});
addAction(actionName, createTagAndAddToNoteAction);

actionName = 'notes/addTagToNoteAction';
export interface AddTagToNoteActionPayload {
  noteActionDTO: NoteActionDto;
  tag: Tag;
}
export const addTagToNoteAction = createAsyncThunk<
  NoteDetailResult,
  AddTagToNoteActionPayload
>(actionName, async (payload) => {
  const { noteActionDTO, tag } = payload;
  return await addTagToNote(noteActionDTO);
});
addAction(actionName, addTagToNoteAction);

actionName = 'notes/removeTagToNoteAction';
export interface RemoveTagToNoteActionPayload {
  noteActionDTO: NoteActionDto;
}
export const removeTagToNoteAction = createAsyncThunk<
  NoteDetailResult,
  RemoveTagToNoteActionPayload
>(actionName, async (payload) => {
  const { noteActionDTO } = payload;
  return await removeTagToNote(noteActionDTO);
});
addAction(actionName, removeTagToNoteAction);

const notes = createSlice({
  name: 'notes',
  initialState: initialNotesState,
  extraReducers: (builder) => {
    builder
      // setSelectedNoteId
      .addCase(setSelectedNoteIdAction, (state, action) => {
        console.log('setSelectedNoteId', action);

        state.selectedNoteId = action.payload.selectedNoteId;
      })

      // fetchNoteThunk
      .addCase(fetchNoteAction.pending, (state, action) => {
        console.log('fetchNote.pending');
        state.error = null;

        const noteId = action.meta.arg.noteId;
        const note = state.notesCache[noteId];
        const newNotes = { ...state.notes, [noteId]: note };
        state.notes = newNotes;
        state.notesCache = newNotes; // ? Should not update cache on pending ?
      })
      .addCase(fetchNoteAction.fulfilled, (state, action) => {
        console.log('fetchNote.fulfilled', state, action);

        const noteId = action.meta.arg.noteId;
        const note = action.payload.note;
        const newNotes = { ...state.notes, [noteId]: note };
        state.notes = newNotes;
        state.notesCache = newNotes;
      })
      .addCase(fetchNoteAction.rejected, (state, action) => {
        console.log('# fetchNote.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        // TODO: Need fallback to this optimistic rendering
        // state.isLoading = false;
        // state.error = action.error.message;
      })

      // fetchNotes
      .addCase(fetchNotesAction.pending, (state, action) => {
        console.log('# fetchNotes.pending', action);

        if (Object.keys(state.notes).length === 0) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchNotesAction.fulfilled, (state, action) => {
        console.log('# fetchNotes.fulfilled', action);

        state.isLoading = false;
        state.error = null;
        var notes = action.payload.notes;
        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(fetchNotesAction.rejected, (state, action) => {
        console.log('# fetchNotes.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }
        state.isLoading = false;
        // state.error = action.error.message;
      })

      // createNoteThunk
      .addCase(createNoteAction.pending, (state, action) => {
        console.log('createNoteThunk.pending', state, action);

        // 03
        // TODO: Need to use a UUID for offline compatibility
        const noteIdTemp = 'temp-' + action.meta.requestId;
        const newNote: INote = {
          id: noteIdTemp,
          createDate: new Date(),
          updateDate: new Date(),
          color: NoteColor.GRAY,
          isFav: false,
          tags: [],
          content: '',
          name: '',
        };
        state.notes[noteIdTemp] = newNote;

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
      .addCase(createNoteAction.fulfilled, (state, action) => {
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
      .addCase(createNoteAction.rejected, (state, action) => {
        console.log('createNoteThunk.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }
        // 03
        // const noteIdTemp = 'temp-' + action.meta.requestId;
        // const newNote: INote = {
        //   ...action.meta.arg,
        //   id: noteIdTemp,
        //   createDate: new Date(),
        //   updateDate: new Date(),
        //   color: NoteColor.GRAY,
        //   isFav: false,
        //   tags: [],
        //   content: '',
        //   name: '',
        // };
        // delete state.notes[noteIdTemp];

        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        // const noteId = 99999999999;
        // const newNotes = { ...state.notes };
        // delete newNotes[noteId];

        // state.notes = newNotes;
        // state.notesCache = newNotes;
      })

      // addNoteLocalAction
      // TODO: Do not use this action
      .addCase(addNoteLocalAction, (state, action) => {
        console.log('addNoteLocalAction', state, action);

        const note = action.payload.note;
        const noteId = note.id;
        state.notes[noteId] = note;
      })

      // updateNoteThunk
      .addCase(updateNoteActionAction.pending, (state, action) => {
        console.log('updateNoteThunk.pending', state, action);

        // Optimistic rendering
        const noteId = action.meta.arg.noteId;
        if (noteId) {
          const note = state.notes[noteId];
          const newNote = {
            ...note,
            ...action.meta.arg.updateNoteDTO,
            noteId: noteId,
          };
          const notes = { ...state.notes, [noteId]: newNote };

          state.notes = notes;
          state.notesCache = notes;
        }
      })
      .addCase(updateNoteActionAction.fulfilled, (state, action) => {
        console.log('updateNoteThunk.fulfilled', state, action);

        const note = action.payload.note;
        const noteId = note.id;
        const notes = { ...state.notes, [noteId]: note };

        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(updateNoteActionAction.rejected, (state, action) => {
        console.log('updateNoteThunk.rejected', state, action);

        if (!navigator.onLine) {
          return;
        }
        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        const noteId = action.meta.arg.noteId;
        if (noteId) {
          const noteCached = state.notesCache[noteId];
          const notes = { ...state.notes, [noteId]: noteCached };

          state.notes = notes;
          state.notesCache = notes;
        }
      })

      // deleteNoteThunk
      .addCase(deleteNoteAction.pending, (state, action) => {
        console.log('deleteNoteThunk.pending', state, action);

        const noteId = action.meta.arg.noteId;
        const notes = { ...state.notes };
        delete notes[noteId];

        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(deleteNoteAction.fulfilled, (state, action) => {
        console.log('deleteNoteThunk.fulfilled', action);

        const noteId = action.meta.arg.noteId;
        const notes = { ...state.notes };
        delete notes[noteId];

        state.notes = notes;
        state.notesCache = notes;
      })
      .addCase(deleteNoteAction.rejected, (state, action) => {
        console.log('deletNoteThunk.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        // Rollback delete action with note from cache
        // TODO: Display error to user (notification)
        const noteId = action.meta.arg.noteId;
        const noteCached = state.notesCache[noteId];
        const notes = { ...state.notes, [noteId]: noteCached };

        state.notes = notes;
        state.notesCache = notes;
      })

      // createTagAndAddToNoteAction
      .addCase(createTagAndAddToNoteAction.pending, (state, action) => {
        console.log('createTagAndAddToNoteAction.pending', action);

        const tag: Tag = {
          color: action.meta.arg.noteActionDTO.tagColor
            ? TagColor[action.meta.arg.noteActionDTO.tagColor]
            : TagColor.GRAY,
          name: action.meta.arg.noteActionDTO.tagName || '',
          icon: action.meta.arg.noteActionDTO.tagIcon
            ? TagIcon[action.meta.arg.noteActionDTO.tagIcon]
            : TagIcon.TAG,
          createDate: new Date(),
          updateDate: new Date(),
          id: Math.round(Math.random() * 999), // TODO: UUID
          isActive: true,
          mode: Mode.Default, // TODO: Is this required ?
        };

        // TODO: Add this Tag to notes
        const noteId = action.meta.arg.noteActionDTO.noteId;
        const note = state.notes[noteId];
        note.tags.push(tag);

        state.notes[noteId] = note;
      })
      .addCase(createTagAndAddToNoteAction.fulfilled, (state, action) => {
        console.log('createTagAndAddToNoteAction.fulfilled', action);

        const note = action.payload.note;
        const noteId = note.id;
        const tag = action.payload.tag;

        note.tags.push(tag);
        state.notes[noteId] = note;
        state.notesCache[noteId] = note;
      })
      .addCase(createTagAndAddToNoteAction.rejected, (state, action) => {
        console.log('createTagAndAddToNoteAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }
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

        if (!navigator.onLine) {
          return;
        }
        // const noteId = action.meta.arg.noteActionDTO.noteId;
        // const note = state.notesCache[noteId];
        // state.notes[noteId] = note;
      })

      // removeTagToNoteAction
      .addCase(removeTagToNoteAction.pending, (state, action) => {
        console.log('removeTagToNoteAction.pending', action);

        const noteId = action.meta.arg.noteActionDTO.noteId;
        const tagId = action.meta.arg.noteActionDTO.tagId;
        const note = state.notes[noteId];
        if (tagId) {
          delete note.tags[tagId];
          state.notes[noteId] = note;
        }
      })
      .addCase(removeTagToNoteAction.fulfilled, (state, action) => {
        console.log('removeTagToNoteAction.fulfilled', action);

        const note = action.payload.note;
        const tagId = action.meta.arg.noteActionDTO.tagId;
        const noteId = note.id;
        if (tagId) {
          delete note.tags[tagId];
          state.notes[noteId] = note;
          state.notesCache[noteId] = note;
        }
      })
      .addCase(removeTagToNoteAction.rejected, (state, action) => {
        console.log('removeTagToNoteAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        const noteId = action.meta.arg.noteActionDTO.noteId;
        const noteCached = state.notesCache[noteId];
        state.notes[noteId] = noteCached;
      });
  },
  reducers: {},
});

export default notes.reducer;
