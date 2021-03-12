import {
  Tags,
  Mode,
} from '../../interfaces';

export interface TagsState {
  isLoading: boolean;
  error?: string;
  tags: Tags;
  tagsCache: Tags;
  selectedTagId?: number;
  mode: Mode;
  deleteModeActive: boolean; // TODO: Remove use mode
  editModeActive: boolean; // TODO: Remove use mode
}

export const initialTagsState: TagsState = {
  error: undefined,
  isLoading: false,
  selectedTagId: undefined,
  tags: {},
  tagsCache: {},
  deleteModeActive: false,
  editModeActive: false,
  mode: Mode.Default,
};
