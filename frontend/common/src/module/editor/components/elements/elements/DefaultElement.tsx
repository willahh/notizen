import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Commands } from '../../Commands';
import { OptionsMemo } from '../../plugins/options/Options';

export type IDefaultElementProps = {};

function getSelectionStart() {
  var node = document.getSelection()?.anchorNode;
  return node ? (node.nodeType == 3 ? node.parentNode : node) : null;
}

const DefaultElement: React.FC<IDefaultElementProps> = (props: any) => {
  console.log('DefaultElement');

  const dispatch = useDispatch();
  const editor = props.editor;
  const firstChildren = props.element.children[0];
  const isEmpty = firstChildren.text.length === 0;
  // const isEmpty = true;
  const [hasFocus, setHashFocus] = useState(false);

  useEffect(() => {
    const ref = props.attributes.ref;
    let hasFocus = false;
    const s: any = getSelectionStart();
    if (s) {
      const match = s.closest('div[data-slate-node="element"]');
      hasFocus = ref.current === match;
      setHashFocus(hasFocus);
    }
  });

  return (
    <div {...props.attributes} className="editor-block relative flex mb-2">
      <OptionsMemo editor={editor}></OptionsMemo>
      <div className="w-full mb-2" style={{ minHeight: 24 }}>
        {props.children}
      </div>
      {isEmpty && hasFocus && (
        <strong
          className="absolute top-0 left-0 text-gray-200 dark:text-gray-700"
          style={{ userSelect: 'none' }}
          contentEditable={false}
        >
          <div className="flex">
            <strong className="pointer-events-none">Add a new action</strong>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('mousedown');
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log('click');
              }}
            >
              [cb]
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('mousedown');
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log('click');
              }}
            >
              [quote]
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('mousedown');
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log('click');

                const range = editor.selection;
                const noteId = 'xxx'; // TODO
                // toggleBlockquote(editor, noteId, range, dispatch)
                // Commands.toggleCodeBlock(editor);
              }}
            >
              [code]
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('mousedown');
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log('click');

                Commands.toggleImageBlock(editor);
              }}
            >
              [image]
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('mousedown');
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log('click');
              }}
            >
              [date]
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('mousedown');
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log('click');
              }}
            >
              [divider]
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                console.log('mousedown');
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log('click');
              }}
            >
              [draw]
            </button>
          </div>
        </strong>
      )}
      {/* <div
        contentEditable={false}
        className="pl-6 dark:text-indigo-500"
        style={{ width: 200 }}
      >
        ... Add a new action
      </div> */}
    </div>
  );
};

export default React.memo(DefaultElement);