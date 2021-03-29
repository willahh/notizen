import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Node, Range, Transforms } from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setTagAction,
  SetTagActionPayload,
  unsetTagAction,
  UnsetTagActionPayload,
} from './tag.action';

export const setTag = (editor: Editor, range: Range): Node[] => {
  console.log('setTag');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Tag },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetTag = (editor: Editor, range: Range): Node[] => {
  console.log('unsetTag');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Paragraph },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const toggleTag = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleTag');

  if (isNodeActive(editor, ElementType.Tag)) {
    const unsetTagActionPayload: UnsetTagActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetTagAction.type,
      action: unsetTagAction(unsetTagActionPayload),
      dispatch,
      payload: unsetTagActionPayload,
    });
  } else {
    const setTagActionPayload: SetTagActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setTagAction.type,
      action: setTagAction(setTagActionPayload),
      dispatch,
      payload: setTagActionPayload,
    });
  }
};

export const onEditorEnterKeydown = (event, editor: Editor) => {
  console.log('onEditorEnterKeydown');
};
