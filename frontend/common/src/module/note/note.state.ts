// import { LOCAL_STORAGE_NOTES_KEY } from '../../constants';
import { Notes } from '../../interfaces';

// TODO: Use cached state from YJS
// const getNotesFromLocalStorage = () => {
//   const localStorageData = window.localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
//   return localStorageData ? JSON.parse(localStorageData) : {};
// };
// const notesInitialData = getNotesFromLocalStorage();
const notesInitialData = {};

enum SortKey {
  CreateDate = 'CREATE_DATE',
  UpdateDate = 'UPDATE_DATE',
  Name = 'NAME',
}
const defaultSortKey = SortKey.Name;

enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}
const defaultSortOrder = SortOrder.Asc;

// type ActionName = string;
// type PendingRequestCount = number;
// type PendingRequest = Map<ActionName, PendingRequestCount>;


interface NoteListState {
  isLoading: boolean;
  error: string | null;
  notes: Notes;
  notesCache: Notes;
  selectedNoteId?: string;
  sortKey: SortKey;
  sortOrder: SortOrder;
  pendingRequests: any;
}

export const initialNotesState: NoteListState = {
  isLoading: false,
  error: null,
  notes: notesInitialData,
  notesCache: notesInitialData,
  sortKey: defaultSortKey,
  sortOrder: defaultSortOrder,
  selectedNoteId: undefined,
  pendingRequests: {}
};
