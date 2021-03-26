import React from 'react';
import { OptionsMemo } from '../plugins/options/Options';
const Heading3Element = (props: any) => {
  const firstChildren = props.element.children[0];
  const isEmpty = firstChildren.text.length === 0;
  const hasFocus = true; // TODO

  const icon = (
    <svg
      className="absolute inline w-8 h-8 -left-10"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );

  return (
    <div {...props.attributes} className="editor-block relative flex">
      {/* <OptionsMemo editor={props.editor}></OptionsMemo> */}
      <div className="relative w-full font-semibold text-xl">
        <h3>{props.children}</h3>
        {isEmpty && hasFocus && (
          <strong className="absolute top-0 left-0 text-gray-200 dark:text-gray-700 pointer-events-none">
            Heading 3
          </strong>
        )}
      </div>
    </div>
  );
};

export default React.memo(Heading3Element);