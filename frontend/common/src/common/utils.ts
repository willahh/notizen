import { Dispatch } from 'react';
import {
  addCommandToCommandsQueue as addCommandToCommandsQueue,
} from './../module/sync/Sync';


export const hashCode = (str: string) => {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


export const mapOfKeyValueToArrayOfMap = (m: any) => {
  const acc: any = [];
  const array = Object.keys(m ? m : {}).reduce((acc, v) => {
    if (m[v]) {
      acc.push(m[v]);
    }
    return acc;
  }, acc);
  return array;
};

export const arrayOfMapToMapOfKeyValue = (arr: any) => {
  const acc = {};
  const map = arr.reduce((acc: any, v: any) => {
    if (v) {
      acc[v.id].push(v);
    }
    return acc;
  }, acc);
  return map;
};


/**
 * Dispatch a Query.
 * Encapsulate a Redux Action.
 * Query is used for read actions.
 *
 * @param query Query
 * @returns ReduxAction
 */
export interface Query {
  name: string;
  payload: Object;
  action: any;
  dispatch: Dispatch<any>;
}

// TODO: Describe the return : either a ReduxAction or ReduxThunkAction
export const dispatchQuery = async (query: Query) => {
  console.log('dispatchQuery', query);

  // TODO: Add a log
  // TODO: Publish an event
  const reduxAction = query.dispatch(query.action);
  return reduxAction;
  // return StoreActionsWhenOfflineReduxMiddleware2(query);
};

/**
 * Dispatch a Command.
 * Encapsulate a Redux Action.
 * Command is used for write actions.
 *
 * @param command Command
 * @returns ReduxAction
 */
export interface Command {
  name: string;
  payload: Object;
  action: any; // TODO: describe this type, it is either a ReduxAction or a ReduxThunkAction
  dispatch: Dispatch<any>;
}
export const dispatchCommand = async (command: Command) => {
  console.log('dispatchCommand', command);

  // TODO: Add a log
  // TODO: Publish an event
  return await addCommandToCommandsQueue(command);
};
