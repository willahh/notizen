import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_TAG
 */
 export const EDITOR_SET_TAG = 'EDITOR/EDITOR_SET_TAG';
 export interface SetTagActionPayload {
   noteId: string;
   range: Range;
 }
 export const setTagAction = createAction(
   EDITOR_SET_TAG,
   (payload: SetTagActionPayload) => {
     return {
       payload: payload,
     };
   }
 );
 
 /**
  * EDITOR_UNSET_TAG
  */
 export const EDITOR_UNSET_TAG = 'EDITOR/EDITOR_UNSET_TAG';
 export interface UnsetTagActionPayload {
   noteId: string;
   range: Range;
 }
 export const unsetTagAction = createAction(
   EDITOR_UNSET_TAG,
   (payload: UnsetTagActionPayload) => {
     return {
       payload: payload,
     };
   }
 );