import React, { useMemo, useState, useCallback } from 'react';
import Prism from 'prismjs';

import {
  Editor,
  Node,
  Transforms,
  Text,
} from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Commands } from './Commands';
import { HoveringToolbar } from './plugins/hoveringToolbar/HoveringToolbar';
import { renderElement } from './elements/elements';
import { UpdateNoteDTO } from '../../../common/interfaces';
import { noteIconColorMap } from '../../../common/components/TagIcon';
import {
  updateNoteActionAction,
  UpdateNoteActionPayload,
} from '../../note/note.actions';
import { dispatchCommand } from '../../../common/utils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  updateContentAction,
  UpdateContentActionPayload,
} from '../editor.actions';
import { ErrorBoundary } from '../../../common/components/ErrorBoundary';
import { renderLeaf } from './leafs/Leaf';

// eslint-disable-next-line
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

// Define a React component to render leaves with bold text.
// const Leaf = (props:any) => {
//   return (
//     <span
//       {...props.attributes}
//       className={`${props.leaf.bold ? `font-bold` : ``}`}
//       // style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
//     >
//       {props.children}
//     </span>
//   );
// };

interface IEditor {
  editor: Editor & ReactEditor;
  nodes: Node[];
  noteId: string;
}


export const NotizenEditor: React.FC<IEditor> = ({ editor, nodes, noteId }) => {
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

  // Define a leaf rendering function that is memoized with `useCallback`.
  // const renderLeaf = useCallback((props) => {
  //   return <Leaf {...props} />;
  // }, []);

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
    console.log('handleEditorBlur', event, editor);
    // return false;
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
  };

  // const decorate = useCallback(([node, path]) => {
  //   const ranges: any[] = [];

  //   if (!Text.isText(node)) {
  //     return ranges;
  //   }

  //   const getLength = (token: any) => {
  //     if (typeof token === 'string') {
  //       return token.length;
  //     } else if (typeof token.content === 'string') {
  //       return token.content.length;
  //     } else {
  //       return token.content.reduce((l: any, t: any) => l + getLength(t), 0);
  //     }
  //   };

  //   const tokens = Prism.tokenize(node.text, Prism.languages.markdown);

  //   let start = 0;

  //   for (const token of tokens) {
  //     const length = getLength(token);
  //     const end = start + length;

  //     if (typeof token !== 'string') {
  //       ranges.push({
  //         markdown: true,
  //         markdownType: token.type,
  //         anchor: { path, offset: start },
  //         focus: { path, offset: end },
  //       });
  //     }

  //     start = end;
  //   }

  //   return ranges;
  // }, []);

  // // https://github.com/ianstormtaylor/slate/blob/master/site/examples/markdown-shortcuts.tsx

  return (
    <ErrorBoundary>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          console.log('onChange');

          // const payload: UpdateContentActionPayload = {
          //   noteId: noteId,
          //   nodes: value,
          // };
          // dispatchCommand({
          //   name: updateContentAction.type,
          //   action: updateContentAction(payload),
          //   dispatch,
          //   payload,
          // });

          // This is required to keep editor state synchronized
          setValue(value);
        }}
      >
        <HoveringToolbar />
        {/* <button
        onClick={() => {
          addDefaultAtTheEndAndFocus(editor);
        }}
      >
        Add default row
      </button> */}
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

export default NotizenEditor;
