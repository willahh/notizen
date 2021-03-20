import { Editor } from 'slate';
import { BlockType } from './components/elements/elements';

export const isHeading1BlockActive = (editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === BlockType.Heading1,
  });
  return !!match;
};
