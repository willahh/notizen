import React, { useMemo, useState, useCallback } from 'react';

// Import the Slate editor factory.
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import { Commands } from './Commands';
import { HoveringToolbar } from './elements/hoveringToolbar/HoveringToolbar';
import { renderElement } from './elements/elements';

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      className={`${props.leaf.bold ? `font-bold` : ``}`}
      // style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

export const NotizenEditor = () => {
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), []);

  // Keep track of state for the value of the editor.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const renderElementMemoized = renderElement(editor);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value: any) => {
        console.log('onChange', value);

        setValue(value);
      }}
    >
      <HoveringToolbar />
      <Editable
        renderElement={renderElementMemoized}
        renderLeaf={renderLeaf}
        className="h-full text-black dark:text-white"
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
  );
};

export default NotizenEditor;
