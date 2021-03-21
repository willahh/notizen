import { Options } from './../../plugins/options/Options';
export const Heading1Element = (props: any) => {
  // console.log('Heading1Element', props);

  const firstChildren = props.element.children[0];
  const isEmpty = firstChildren.text.length === 0;
  const hasFocus = true; // TODO

  return (
    <div {...props.attributes} className="editor-block relative flex">
      <Options editor={props.editor}></Options>
      <h1 className="w-full font-semibold text-4xl">
        <strong>{props.children}</strong>
        {isEmpty && hasFocus && (
          <strong
            className="absolute top-0 left-0 text-gray-200 dark:text-gray-700  pointer-events-none"
          >
            Heading 1
          </strong>
        )}
      </h1>
    </div>
  );
};
