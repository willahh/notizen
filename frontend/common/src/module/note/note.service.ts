import { v4 as uuidv4 } from 'uuid';
import { CreateNoteDTO } from './../../common/interfaces';
import {
  createNoteAction,
  CreateNoteActionPayload,
  setSelectedNoteIdAction,
  SetSelectedNoteIdActionPayload,
} from './note.actions';
import { dispatchCommand, dispatchQuery } from './../../common/utils';
import { useDispatch } from 'react-redux';
import { Node } from 'slate';
import { ReactEditor } from 'slate-react';
import { ElementType } from '../editor/components/elements/elements';

export const addNoteAndSelect = async (dispatch) => {
  console.log('addNoteAndSelect');

  const noteId = uuidv4();
  const createNoteDTO: CreateNoteDTO = {
    id: noteId,
    name: 'Ma super note', // TODO: Locale
    content: [],
  };
  
  const payload: CreateNoteActionPayload = {
    createNoteDTO: createNoteDTO,
  };
  await dispatchCommand({
    name: createNoteAction.typePrefix,
    action: createNoteAction(payload),
    payload,
    dispatch,
  });

  const setSelectedNoteIdActionPayload: SetSelectedNoteIdActionPayload = {
    noteId: noteId,
  };
  dispatchQuery({
    name: setSelectedNoteIdAction.name,
    payload: payload,
    action: setSelectedNoteIdAction(setSelectedNoteIdActionPayload),
    dispatch: dispatch,
  });

  ReactEditor.focus(window.editor); // TODO: window.editor => EditorHelper.getEditor() ?
};
