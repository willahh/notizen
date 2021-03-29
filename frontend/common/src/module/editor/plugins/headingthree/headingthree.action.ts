import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_HEADINGTHREE
 */
export const EDITOR_SET_HEADINGTHREE = 'EDITOR/EDITOR_SET_HEADINGTHREE';
export interface SetHeadingThreeActionPayload {
  noteId: string;
  range: Range;
}
export const setHeadingThreeAction = createAction(
  EDITOR_SET_HEADINGTHREE,
  (payload: SetHeadingThreeActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_HEADINGTHREE
 */
export const EDITOR_UNSET_HEADINGTHREE = 'EDITOR/EDITOR_UNSET_HEADINGTHREE';
export interface UnsetHeadingThreeActionPayload {
  noteId: string;
  range: Range;
}
export const unsetHeadingThreeAction = createAction(
  EDITOR_UNSET_HEADINGTHREE,
  (payload: UnsetHeadingThreeActionPayload) => {
    return {
      payload: payload,
    };
  }
);
