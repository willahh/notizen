import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_NUMBEREDLIST
 */
export const EDITOR_SET_NUMBEREDLIST = 'EDITOR/EDITOR_SET_NUMBEREDLIST';
export interface SetNumberedListActionPayload {
  noteId: string;
  range: Range;
}
export const setNumberedListAction = createAction(
  EDITOR_SET_NUMBEREDLIST,
  (payload: SetNumberedListActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_NUMBEREDLIST
 */
export const EDITOR_UNSET_NUMBEREDLIST = 'EDITOR/EDITOR_UNSET_NUMBEREDLIST';
export interface UnsetNumberedListActionPayload {
  noteId: string;
  range: Range;
}
export const unsetNumberedListAction = createAction(
  EDITOR_UNSET_NUMBEREDLIST,
  (payload: UnsetNumberedListActionPayload) => {
    return {
      payload: payload,
    };
  }
);
