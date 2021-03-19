import { useEffect } from 'react';
import { useState } from 'react';
import { Commands } from '../../Commands';
import { Options } from './../../plugins/options/Options';

export type IDefaultElementProps = {};

function getSelectionStart() {
  var node = document.getSelection().anchorNode;
  return node ? (node.nodeType == 3 ? node.parentNode : node) : null;
}

export const DefaultElement: React.FC<IDefaultElementProps> = (props: any) => {
  console.log('DefaultElement');

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
    <div {...props.attributes} className="editor-block relative flex">
      <Options editor={editor}></Options>
      <div className="w-full" style={{ minHeight: 24 }}>
        {props.children}
      </div>
      {isEmpty && hasFocus && (
        <span className="absolute top-0 left-0 text-gray-200 dark:text-gray-700">
          <div className="flex">
            <span className="pointer-events-none">Add a new action</span>
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

                Commands.toggleCodeBlock(editor);
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
        </span>
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
