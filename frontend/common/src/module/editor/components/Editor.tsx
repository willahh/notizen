import React, { useMemo, useState, useCallback } from 'react';
import Prism from 'prismjs';

const isEqual = require('lodash.isequal');
declare global {
  interface Window {
    isEqual: any;
  }
}
window.isEqual = isEqual;
import { Editor, Node, Transforms, Text } from 'slate';
// import { findRange } from 'slate-react';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Commands } from './Commands';
import { HoveringToolbar } from './plugins/hoveringToolbar/HoveringToolbar';
import { ElementType, renderElement } from './elements/elements';
import { INote, UpdateNoteDTO } from '../../../common/interfaces';
import { noteIconColorMap } from '../../../common/components/TagIcon';
import {
  updateNoteActionAction,
  UpdateNoteActionPayload,
} from '../../note/note.actions';
import { dispatchCommand } from '../../../common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  updateContentAction,
  UpdateContentActionPayload,
} from '../editor.actions';
import { ErrorBoundary } from '../../../common/components/ErrorBoundary';
import { renderLeaf } from './leafs/Leaf';
import { RootState } from './../../../common/rootReducer';
import { setBold, toggleBlockquote, toggleBold, toggleHeading1 } from '../editor.service';

// eslint-disable-next-line
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore
// this is where you customize. If you omit this, it will revert to a default.
declare module 'slate' {
  export interface CustomTypes {
    Element:
      | { type: 'heading'; level: number }
      | { type: 'list-item'; depth: number };
    Text: { bold?: boolean; italic?: boolean };
  }
}

interface IEditor {
  editor: Editor & ReactEditor;
  nodes: Node[];
  noteId: string;
  note: INote;
}

// this is where you customize. If you omit this, it will revert to a default.
export interface CustomTypes {
  Element:
    | { type: 'heading'; level: number }
    | { type: 'paragraph2'; level: number }
    | { type: 'list-item'; depth: number };
  Text: { bold?: boolean; italic?: boolean };
}

export const NotizenEditor: React.FC<IEditor> = ({
  editor,
  nodes,
  noteId,
  note,
}) => {
  console.log('NotizenEditor', noteId);

  const dispatch = useDispatch();

  // Keep track of state for the value of the editor.
  const [value, setValue] = useState(nodes);

  useEffect(() => {
    console.log('[x] useEffect nodes');
    setValue(nodes);
  }, [nodes]);

  const renderElementMemoized = renderElement(editor);
  const renderLeafMemoized = renderLeaf(editor);

  const addDefaultAtTheEndAndFocus = (editor: Editor & ReactEditor) => {
    console.log('addDefaultAtTheEndAndFocus', editor);

    const node: Node = {
      type: 'paragraph',
      children: [{ type: 'paragraph', text: '' }],
    };
    Transforms.insertNodes(editor, nodes, {
      at: [editor.children.length],
    });
    ReactEditor.focus(editor);
  };

  const handleEditorBlur = (event: any) => {
    console.log('handleEditorBlur');
    let canUpdate = false;
    if (note) {
      // TODO: This test does not works with bold action
      // if (!isEqual(note.content, editor.children)) {
      if (true) {
        canUpdate = true;
      }
    } else {
      console.log('xx !note');
    }
    console.log('xx canUpdate', canUpdate);

    if (canUpdate) {
      const content = editor.children;
      const updateNoteDTO: UpdateNoteDTO = {
        id: noteId,
        content: content,
      };
      const payload: UpdateNoteActionPayload = {
        updateNoteDTO: updateNoteDTO,
      };
      dispatchCommand({
        name: updateNoteActionAction.typePrefix,
        action: updateNoteActionAction(payload),
        dispatch: dispatch,
        payload: payload,
      });
    }
  };

  return (
    <ErrorBoundary>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          console.log('xx onChange');

          // This is required to keep editor state synchronized
          setValue(value);
        }}
      >
        <HoveringToolbar />
        <Editable
          renderElement={renderElementMemoized}
          renderLeaf={renderLeafMemoized}
          // decorate={decorate}
          className="h-full font-normal text-sm text-gray-700 dark:text-gray-300"
          onBlur={handleEditorBlur}
          onClick={(event) => {
            console.log('onClick');

            window._event = event; // TODO
          }}
          onKeyDown={(event) => {
            console.log('on key down');

            if (event.key === 'Enter') {
              const match = Editor.above(editor, {
                match: (n) => Editor.isBlock(editor, n),
              });
              if (match) {
                const [block, path] = match;
                if (block.type === ElementType.BlockQuote) {
                  console.log('blockquote');
                  const currFragment = Editor.fragment(
                    editor,
                    editor.selection.anchor.path
                  );
                  if (
                    currFragment.length > 0 &&
                    currFragment[0].type === ElementType.BlockQuote &&
                    currFragment[0].children[0].text === ''
                  ) {
                    console.log('le noeud courant est un blockquote vide');
                    event.preventDefault();
                    Transforms.setNodes(
                      editor,
                      { type: ElementType.Paragraph, text: '' },
                      {
                        match: (n) => Editor.isBlock(editor, n),
                        at: editor.selection.anchor.path,
                        split: true,
                      }
                    );
                  }
                }
              }
            }

            // TODO NEW LINE
            // debugger;

            if (!event.ctrlKey) {
              return;
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case 'p': {
                event.preventDefault();
                const range = editor.selection;
                toggleBlockquote(editor, noteId, range, dispatch);
                break;
              }

              case 'b': {
                console.log('ctrl + b');
                event.preventDefault();
                const range = editor.selection;
                toggleBold(editor, noteId, range, dispatch);
                break;
              }

              case 'h': {
                event.preventDefault();
                const range = editor.selection;
                toggleHeading1(editor, noteId, range, dispatch);
                break;
              }
            }
          }}
        />
      </Slate>
    </ErrorBoundary>
  );
};

export default React.memo(NotizenEditor);
