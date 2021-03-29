import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_BULLETLIST
 */
export const EDITOR_SET_BULLETLIST = 'EDITOR/EDITOR_SET_BULLETLIST';
export interface SetBulletListActionPayload {
  noteId: string;
  range: Range;
}
export const setBulletListAction = createAction(
  EDITOR_SET_BULLETLIST,
  (payload: SetBulletListActionPayload) => {
    return {
      payload: payload,
    };
  }
);

/**
 * EDITOR_UNSET_BULLETLIST
 */
export const EDITOR_UNSET_BULLETLIST = 'EDITOR/EDITOR_UNSET_BULLETLIST';
export interface UnsetBulletListActionPayload {
  noteId: string;
  range: Range;
}
export const unsetBulletListAction = createAction(
  EDITOR_UNSET_BULLETLIST,
  (payload: UnsetBulletListActionPayload) => {
    return {
      payload: payload,
    };
  }
);
