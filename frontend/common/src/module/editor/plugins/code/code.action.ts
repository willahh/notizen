import { Range } from 'slate';
import { createAction } from '../../../../common/actions';

/**
 * EDITOR_SET_CODE
 */
 export const EDITOR_SET_CODE = 'EDITOR/EDITOR_SET_CODE';
 export interface SetCodeActionPayload {
   noteId: string;
   range: Range;
 }
 export const setCodeAction = createAction(
   EDITOR_SET_CODE,
   (payload: SetCodeActionPayload) => {
     return {
       payload: payload,
     };
   }
 );
 
 /**
  * EDITOR_UNSET_CODE
  */
 export const EDITOR_UNSET_CODE = 'EDITOR/EDITOR_UNSET_CODE';
 export interface UnsetCodeActionPayload {
   noteId: string;
   range: Range;
 }
 export const unsetCodeAction = createAction(
   EDITOR_UNSET_CODE,
   (payload: UnsetCodeActionPayload) => {
     return {
       payload: payload,
     };
   }
 );