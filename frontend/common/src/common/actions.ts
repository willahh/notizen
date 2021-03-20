import {
  createAction as createActionRedux,
  AsyncThunkAction,
  AsyncThunkPayloadCreator,
  AsyncThunkPayloadCreatorReturnValue,
  createAsyncThunk,
  PrepareAction,
  PayloadActionCreator,
} from '@reduxjs/toolkit';

// import { Dispatch } from 'redux';

export const actionNameToAction = new Map();

export const addAction = (name: string, action: any) => {
  actionNameToAction.set(name, action);
};

export const getAction = (name: string) => {
  actionNameToAction.get(name);
};

/**
 * Redux createAction wrapper.
 * @param typePrefix Action type prefix
 * @param prepareAction Redux action
 * @returns Redux action
 */
export function createAction<
  PA extends PrepareAction<any>,
  T extends string = string
>(
  typePrefix: T,
  prepareAction: PA
): PayloadActionCreator<ReturnType<PA>['payload'], T, PA> {
  const reduxAction = createActionRedux(typePrefix, prepareAction);
  addAction(typePrefix, reduxAction);
  return reduxAction;
}

/**
 * Redux createAsyncThunk wrapper.
 * TODO
 */
// type CreateAsyncThunkType = typeof createAsyncThunk;

// export function createAsyncAction(typePrefix, payloadCreator) {
//   const reduxAction = createAsyncThunk<
//     NoteDetailResult,
//     FetchNoteActionPayload
//   >(typePrefix, payloadCreator);
//   addAction(typePrefix, reduxAction);

//   return reduxAction;
// }
