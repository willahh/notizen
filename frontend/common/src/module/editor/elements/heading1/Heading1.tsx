import { Options } from './../../plugins/options/Options';
export const Heading1Element = (props) => {
  console.log('Heading1Element', props);

  const firstChildren = props.element.children[0];
  const isEmpty = firstChildren.text.length === 0;

  return (
    <div {...props.attributes} className="editor-block relative flex">
      <Options editor={props.editor}></Options>
      <h1 className="w-full font-semibold text-4xl">
        <span>{props.children}</span>
        {isEmpty && (
          <span
            contentEditable={false}
            className="absolute top-0 left-0 text-indigo-50 dark:text-indigo-900"
          >
            Heading 1
          </span>
        )}
      </h1>
    </div>
  );
};
