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

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Commands } from './Commands';
import { HoveringToolbar } from './plugins/hoveringToolbar/HoveringToolbar';
import { renderElement } from './elements/elements';
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

// eslint-disable-next-line
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

interface IEditor {
  editor: Editor & ReactEditor;
  nodes: Node[];
  noteId: string;
  note: INote;
}

export const NotizenEditor: React.FC<IEditor> = ({ editor, nodes, noteId, note }) => {
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
      if (!isEqual(note.content, editor.children)) {
        canUpdate = true;
      }
    } else {
      console.log('xx !note')
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
            if (!event.ctrlKey) {
              return;
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case 'p': {
                event.preventDefault();
                Commands.toggleCodeBlock(editor);
                break;
              }

              case 'b': {
                event.preventDefault();
                Commands.toggleBoldMark(editor);
                break;
              }

              case 'h': {
                event.preventDefault();
                Commands.toggleHeading1Block(editor);
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
