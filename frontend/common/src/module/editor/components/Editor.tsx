import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Editor, Element, Node, Text, Transforms } from 'slate';
import { Editable, ReactEditor, Slate } from 'slate-react';
import { ErrorBoundary } from '../../../common/components/ErrorBoundary';
import { INote, UpdateNoteDTO } from '../../../common/interfaces';
import { dispatchCommand } from '../../../common/utils';
import {
  updateNoteActionAction,
  UpdateNoteActionPayload,
} from '../../note/note.actions';
import { getDecorateRangeForCode } from '../plugins/code/code.service';
import { onEditorKeydown } from '../service/editor.event.service';
import { ElementType, renderElement } from './elements/elements';
import { renderLeaf } from './leafs/Leaf';
import { HoveringToolbar } from './plugins/hoveringToolbar/HoveringToolbar';

const isEqual = require('lodash.isequal');
declare global {
  interface Window {
    isEqual: any;
  }
}
window.isEqual = isEqual;

// TODO: Debug
declare global {
  interface Window {
    Editor: any;
    Transforms: any;
    Text: any;
    Element: any;
    RangeRef: any;
    ReactEditor: any;
    debugCurrentEditorValue: any;
  }
}
window.Editor = Editor;
window.Transforms = Transforms;
window.Text = Text;
window.Element = Element;

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

  const renderElementMemoized = renderElement(editor, noteId);
  const renderLeafMemoized = renderLeaf(editor);

  const [language, setLanguage] = useState('html');
  // decorate function depends on the language selected
  const decorate = useCallback(
    ([node, path]) => {
      // TODO: Warning this is call in every keydown
      // console.log('decorate');
      let ranges = [];
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        if (block.type === ElementType.Code) {
          ranges = getDecorateRangeForCode(node, path, language);
        }
      }

      return ranges;
    },
    [language]
  );

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
          window.debugCurrentEditorValue = value;

          // This is required to keep editor state synchronized
          setValue(value);
        }}
      >
        <HoveringToolbar />
        <Editable
          renderElement={renderElementMemoized}
          renderLeaf={renderLeafMemoized}
          decorate={decorate}
          className="h-full font-normal text-sm text-gray-700 dark:text-gray-300"
          onBlur={handleEditorBlur}
          onClick={(event) => {
            console.log('onClick');
          }}
          onKeyDown={(event) => {
            console.log('on key down');

            onEditorKeydown(event, editor, noteId, dispatch);
          }}
        />
      </Slate>
    </ErrorBoundary>
  );
};

// WARNING: Memoized Editor can maybe cause errors, try to re-enable it with precautions
// export default React.memo(NotizenEditor);
export default NotizenEditor;
