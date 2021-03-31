/**
 * editor.action.service.ts
 * This is where all the logical part of the editor is present.
 * Actions should be kept simple.
 * Reducers should only update internal state with little to no actions. If a Reducer needs complex processing, it should
 * refer to this namespace.
 */
import { Editor } from 'slate';
import { ElementType } from '../components/elements/elements';
import { LeafType } from '../components/leafs/Leaf';

type NodeType = ElementType | LeafType;

export const isNodeActive = (editor: Editor, nodeType: NodeType) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === nodeType,
    // universal: true,
    mode: 'all',
  });
  return !!match;
};
