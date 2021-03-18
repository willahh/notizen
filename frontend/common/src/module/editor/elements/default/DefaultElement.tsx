import { useEffect } from 'react';
import { useState } from 'react';
import { Options } from './../../plugins/options/Options';

export type IDefaultElementProps = {};

function getSelectionStart() {
  var node = document.getSelection().anchorNode;
  return node ? (node.nodeType == 3 ? node.parentNode : node) : null;
}

export const DefaultElement: React.FC<IDefaultElementProps> = (props: any) => {
  console.log('DefaultElement', props);

  const firstChildren = props.element.children[0];
  // const isEmpty = firstChildren.text.length === 0;
  const isEmpty = false;
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
      <Options editor={props.editor}></Options>
      <div className="w-full" style={{ minHeight: 24 }}>
        {props.children}
      </div>
      {isEmpty && hasFocus && (
        <span className="absolute top-0 left-0 text-gray-200 dark:text-gray-700  pointer-events-none">
          Add a new action
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
