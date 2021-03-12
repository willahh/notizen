import { LOCAL_STORAGE_NOTES_KEY } from '../../constants';
import { Notes } from '../../interfaces';

const getNotesFromLocalStorage = () => {
  const localStorageData = window.localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
  return localStorageData ? JSON.parse(localStorageData) : {};
};
const notesInitialData = getNotesFromLocalStorage();

interface NoteListState {
  isLoading: boolean;
  error: string | null;
  notes: Notes;
  notesCache: Notes;
  selectedNoteId?: string;
}

export const initialNotesState: NoteListState = {
  isLoading: false,
  error: null,
  notes: notesInitialData,
  notesCache: notesInitialData,
  selectedNoteId: undefined,
};
