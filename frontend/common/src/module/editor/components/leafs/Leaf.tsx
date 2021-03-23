// Define a rendering function based on the element passed to `props`. We use

import { useCallback } from 'react';
import { DefaultLeaf } from './leaf/Default';
import { BoldLeaf } from './leaf/Bold';
import { Editor } from 'slate';
import { MarkdownHeading1 } from './leaf/Markdown';

export enum LeafType {
  Default = 'DEFAULT',
  Bold = 'BOLD',
}

export const renderLeaf = (editor: Editor) =>
  useCallback((props) => {
    switch (props.leaf.type) {
      case LeafType.Default:
        return <DefaultLeaf {...props} />;
      case LeafType.Bold:
        return <BoldLeaf {...props} />;
      default:
        return <DefaultLeaf {...props} />;
    }
  }, []);
