import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Transforms, Range, Node } from 'slate';
import { dispatchCommand } from './../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setHeadingOneAction,
  SetHeadingOneActionPayload,
  unsetHeadingOneAction,
  UnsetHeadingOneActionPayload,
} from './headingone.action';

export const setHeadingOne = (editor: Editor, range: Range): Node[] => {
  console.log('setHeadingOne');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.HeadingOne },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetHeadingOne = (editor: Editor, range: Range): Node[] => {
  console.log('unsetHeadingOne');

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

export const toggleHeadingOne = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleHeadingOne');

  if (isNodeActive(editor, ElementType.HeadingOne)) {
    const unsetHeadingOneActionPayload: UnsetHeadingOneActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetHeadingOneAction.type,
      action: unsetHeadingOneAction(unsetHeadingOneActionPayload),
      dispatch,
      payload: unsetHeadingOneActionPayload,
    });
  } else {
    const setHeadingOneActionPayload: SetHeadingOneActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setHeadingOneAction.type,
      action: setHeadingOneAction(setHeadingOneActionPayload),
      dispatch,
      payload: setHeadingOneActionPayload,
    });
  }
};
