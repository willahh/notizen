import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Transforms, Range, Node } from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setHeadingTwoAction,
  SetHeadingTwoActionPayload,
  unsetHeadingTwoAction,
  UnsetHeadingTwoActionPayload,
} from './headingtwo.action';

export const setHeadingTwo = (editor: Editor, range: Range): Node[] => {
  console.log('setHeadingTwo');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.HeadingTwo },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetHeadingTwo = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeadingTwo');

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

export const toggleHeadingTwo = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleHeadingTwo');

  if (isNodeActive(editor, ElementType.HeadingTwo)) {
    const unsetHeadingTwoActionPayload: UnsetHeadingTwoActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetHeadingTwoAction.type,
      action: unsetHeadingTwoAction(unsetHeadingTwoActionPayload),
      dispatch,
      payload: unsetHeadingTwoActionPayload,
    });
  } else {
    const setHeadingTwoActionPayload: SetHeadingTwoActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setHeadingTwoAction.type,
      action: setHeadingTwoAction(setHeadingTwoActionPayload),
      dispatch,
      payload: setHeadingTwoActionPayload,
    });
  }
};
