import { Options } from '../../plugins/options/Options';
export const Heading2Element = (props) => {
  const firstChildren = props.element.children[0];
  const isEmpty = firstChildren.text.length === 0;
  const hasFocus = true;

  return (
    <div {...props.attributes} className="editor-block relative flex">
      <Options editor={props.editor}></Options>
      <h1 className="w-full font-semibold text-2xl">
        <span>{props.children}</span>
        {isEmpty && hasFocus && (
          <span
            className="absolute top-0 left-0 text-gray-200 dark:text-gray-700  pointer-events-none"
          >
            Heading 2
          </span>
        )}
      </h1>
    </div>
  );
};