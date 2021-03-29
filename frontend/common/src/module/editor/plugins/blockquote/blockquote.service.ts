import { Dispatch } from '@reduxjs/toolkit';
import { Editor, Transforms, Range, Node, Text } from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { LeafType } from '../../components/leafs/Leaf';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setBlockQuoteAction,
  SetBlockQuoteActionPayload,
  unsetBlockQuoteAction,
  UnsetBlockQuoteActionPayload,
} from './blockquote.action';

export const setBlockQuote = (editor: Editor, range: Range): Node[] => {
  console.log('setBlockQuote');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.BlockQuote },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetBlockQuote = (editor: Editor, range: Range): Node[] => {
  console.log('unsetBlockQuote');

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

export const toggleBlockQuote = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleBlockQuote');

  if (isNodeActive(editor, ElementType.BlockQuote)) {
    const unsetBlockQuoteActionPayload: UnsetBlockQuoteActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetBlockQuoteAction.type,
      action: unsetBlockQuoteAction(unsetBlockQuoteActionPayload),
      dispatch,
      payload: unsetBlockQuoteActionPayload,
    });
  } else {
    const setBlockQuoteActionPayload: SetBlockQuoteActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setBlockQuoteAction.type,
      action: setBlockQuoteAction(setBlockQuoteActionPayload),
      dispatch,
      payload: setBlockQuoteActionPayload,
    });
  }
};

export const onEnterKeydown = (event, editor: Editor) => {
  console.log('onEnterKeydown');

  const range = editor.selection;
  const currFragment = Editor.fragment(editor, editor.selection.anchor.path);

  // TODO
  // Create new default at the end of empty quote
  // const currChar = currFragment[0].children[0].text[editor.selection.anchor.offset - 1];
  // debugger;
  if (
    currFragment.length > 0 &&
    currFragment[0].type === ElementType.BlockQuote &&
    currFragment[0].children[0].text === ''
  ) {
    console.log('le noeud courant est un blockquote vide');
    event.preventDefault();
    Transforms.setNodes(
      editor,
      { type: ElementType.Default, text: '' },
      {
        match: (n) => Editor.isBlock(editor, n),
        at: editor.selection.anchor.path,
        split: true,
      }
    );
  }

  // Soft line
  event.preventDefault();
  Transforms.insertText(editor, '\n');

  // event.preventDefault();
  // console.log('Transforms.setNodes blockquotenewline');
  // Transforms.insertNodes(
  //   editor,
  //   { type: LeafType.BlockquoteNewLine, text: 'y' },
  //   {
  //     match: (n) => {
  //       return Text.isText(n);
  //     },
  //   }
  // );

  // Transforms.wrapNodes(
  //   editor,
  //   { type: 'DEFAULT' },
  //   { at: editor.selection, split: true }
  // );

  // Transforms.setNodes(
  //   editor,
  //   { type: LeafType.BlockquoteNewLine },
  //   {
  //     at: range,
  //     match: (node) => {
  //       // console.log('match?', Text.isText(node), node);

  //       return Text.isText(node);
  //     },
  //     split: true,
  //   }
  // );
};
