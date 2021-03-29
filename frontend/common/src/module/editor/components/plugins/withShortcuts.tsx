// https://github.com/ianstormtaylor/slate/blob/master/site/examples/markdown-shortcuts.tsx

// Import the Slate editor factory.
import { useSelector } from 'react-redux';
import {
  Descendant,
  Editor,
  Element as SlateElement,
  Point,
  Range,
  Transforms,
} from 'slate';
import { ReactEditor } from 'slate-react';
import { RootState } from './../../../../common/rootReducer';
import {
  setBulletListAction,
  SetBulletListActionPayload,
} from '../../plugins/bulletlist/bulletlist.action';
import { ElementType } from '../elements/elements';
import { dispatchCommand } from './../../../../common/utils';
import { useEffect, useState } from 'react';
// import { BulletedListElement } from './custom-types'

export type BulletedListElement = {
  type: ElementType.BulletedList;
  children: Descendant[];
};

const SHORTCUTS = {
  '*': ElementType.ListItem,
  '-': ElementType.ListItem,
  '+': ElementType.ListItem,
  '>': ElementType.BlockQuote,
  '#': ElementType.HeadingOne,
  '##': ElementType.HeadingTwo,
  '###': ElementType.HeadingThree,
  '####': ElementType.Heading4,
  '#####': ElementType.Heading5,
  '######': ElementType.Heading6,
  '---': ElementType.Divider,
  '```': ElementType.Code,
  '```sh': ElementType.Code,
  '```javascript': ElementType.Code,
};

export const withShortcuts = (
  editor: Editor & ReactEditor,
  dispatch,
  selectedNoteId: string | undefined
) => {
  console.log('[x2] withShortcuts noteId: ', selectedNoteId);

  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    console.log('[x2] insertText', text);

    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        // TODO: All transformations should be made via a dispatchCommand
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = {
          type,
        };
        Transforms.setNodes(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === ElementType.ListItem) {
          const range = editor.selection;

          if (selectedNoteId) {
            const setBulletListActionPayload: SetBulletListActionPayload = {
              noteId: selectedNoteId,
              range: range,
            };
            dispatchCommand({
              name: setBulletListAction.type,
              action: setBulletListAction(setBulletListActionPayload),
              dispatch,
              payload: setBulletListActionPayload,
            });
          }
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== ElementType.Paragraph &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: ElementType.Paragraph,
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === ElementType.ListItem) {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === ElementType.BulletedList,
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};
