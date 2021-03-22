import { Options } from './../../plugins/options/Options';
export const Heading1Element = (props: any) => {
  // console.log('Heading1Element', props);

  const firstChildren = props.element.children[0];
  const isEmpty = firstChildren.text.length === 0;
  const hasFocus = true; // TODO

  const icon = (
    <button
      className="absolute inline w-8 h-8 -left-10"
      style={{ userSelect: 'none' }}
      contentEditable={false}
    >
      <svg
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
    </button>
  );

  return (
    <div {...props.attributes} className="editor-block relative flex">
      {/* <Options editor={props.editor}></Options> */}
      <div className="relative w-full font-semibold text-4xl">
        <h1>{props.children}</h1>
        {isEmpty && hasFocus && (
          <strong className="absolute top-0 left-0 text-gray-200 dark:text-gray-700 pointer-events-none">
            Heading 1
          </strong>
        )}
      </div>
    </div>
  );
};
