import { ReactEditor } from 'slate-react';
import { getCurrentUserInfo } from './../../database/Auth';
import { v4 as uuidv4 } from 'uuid';
import { CreateNoteDTO, NoteColor } from './../../common/interfaces';
import { dispatchCommand, dispatchQuery } from './../../common/utils';
import {
  createNoteAction,
  CreateNoteActionPayload,
  setSelectedNoteIdAction,
  SetSelectedNoteIdActionPayload,
} from './note.actions';

export const addNoteAndSelect = async (dispatch) => {
  console.log('addNoteAndSelect');

  const noteId = uuidv4();
  const userInfo = getCurrentUserInfo();
  // INFO: Composite id with userId + noteId. This is used to filter only user documents
  // @see https://blog.cloudant.com/2019/05/24/Partitioned-Databases-with-Cloudant-Libraries.html
  const id = userInfo.userId + ':' + noteId;
  const createNoteDTO: CreateNoteDTO = {
    id: id,
    color: NoteColor.GRAY,
    createDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    name: 'Ma super note', // TODO: Locale
    content: [],
    tags: [],
    isFav: false,
    isDeleted: false,
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
