import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_HEADINGTWO
 */
export const EDITOR_SET_HEADINGTWO = 'EDITOR/EDITOR_SET_HEADINGTWO';
export interface SetHeadingTwoActionPayload {
  noteId: string;
  range: Range;
}
export const setHeadingTwoAction = createAction(
  EDITOR_SET_HEADINGTWO,
  (payload: SetHeadingTwoActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_HEADINGTWO
 */
export const EDITOR_UNSET_HEADINGTWO = 'EDITOR/EDITOR_UNSET_HEADINGTWO';
export interface UnsetHeadingTwoActionPayload {
  noteId: string;
  range: Range;
}
export const unsetHeadingTwoAction = createAction(
  EDITOR_UNSET_HEADINGTWO,
  (payload: UnsetHeadingTwoActionPayload) => {
    return {
      payload: payload,
    };
  }
);
