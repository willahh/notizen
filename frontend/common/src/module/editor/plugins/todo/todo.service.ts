import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Transforms, Range, Node } from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setTodoAction,
  SetTodoActionPayload,
  unsetTodoAction,
  UnsetTodoActionPayload,
} from './todo.action';

export const setTodo = (editor: Editor, range: Range): Node[] => {
  console.log('setTodo');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Todo },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetTodo = (editor: Editor, range: Range): Node[] => {
  console.log('unsetTodo');

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

export const toggleTodo = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleTodo');

  if (isNodeActive(editor, ElementType.Todo)) {
    const unsetTodoActionPayload: UnsetTodoActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetTodoAction.type,
      action: unsetTodoAction(unsetTodoActionPayload),
      dispatch,
      payload: unsetTodoActionPayload,
    });
  } else {
    const setTodoActionPayload: SetTodoActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setTodoAction.type,
      action: setTodoAction(setTodoActionPayload),
      dispatch,
      payload: setTodoActionPayload,
    });
  }
};
