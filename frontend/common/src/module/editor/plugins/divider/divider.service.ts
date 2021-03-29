import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Transforms, Range, Node } from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setDividerAction,
  SetDividerActionPayload,
  unsetDividerAction,
  UnsetDividerActionPayload,
} from './divider.action';

export const setDivider = (editor: Editor, range: Range): Node[] => {
  console.log('setDivider');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Divider },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetDivider = (editor: Editor, range: Range): Node[] => {
  console.log('unsetDivider');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Default },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const toggleDivider = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleDivider');

  if (isNodeActive(editor, ElementType.Divider)) {
    const unsetDividerActionPayload: UnsetDividerActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetDividerAction.type,
      action: unsetDividerAction(unsetDividerActionPayload),
      dispatch,
      payload: unsetDividerActionPayload,
    });
  } else {
    const setDividerActionPayload: SetDividerActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setDividerAction.type,
      action: setDividerAction(setDividerActionPayload),
      dispatch,
      payload: setDividerActionPayload,
    });
  }
};
