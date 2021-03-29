// Define a rendering function based on the element passed to `props`. We use

import { useCallback } from 'react';
import { Editor } from 'slate';

export enum LeafType {
  Default = 'DEFAULT',
  Bold = 'BOLD',
  Italic = 'ITALIC',
  Underline = 'UNDERLINE',
  LineThrough = 'LINETHROUGH',
  BlockquoteNewLine = 'BLOCKQUOTE_NEW_LINE'
}

const DefaultLeaf = (props: any) => {
  return <span {...props.attributes}>{props.children}</span>;
};

const BoldLeaf = (props: any) => {
  return (
    <strong {...props.attributes} className="font-bold">
      {props.children}
    </strong>
  );
};

const ItalicLeaf = (props: any) => {
  return (
    <span {...props.attributes} className="italic">
      {props.children}
    </span>
  );
};

const UnderlineLeaf = (props: any) => {
  return (
    <span {...props.attributes} className="underline">
      {props.children}
    </span>
  );
};

const LineThrouhLeaf = (props: any) => {
  return (
    <span {...props.attributes} className="line-through">
      {props.children}
    </span>
  );
};

const BlockquoteNewLine = (props: any) => {
  console.log('BlockquoteNewLine', props);
  
  return (
    <p {...props.attributes} className="border border-red-500">
      {props.children}
    </p>
  );
};

export const renderLeaf = (editor: Editor) =>
  useCallback((props) => {
    console.log('props.leaf.type', props.leaf.type);
    
    switch (props.leaf.type) {
      case LeafType.Default:
        return <DefaultLeaf {...props} />;
      case LeafType.Bold:
        return <BoldLeaf {...props} />;
      case LeafType.Italic:
        return <ItalicLeaf {...props} />;
      case LeafType.Underline:
        return <UnderlineLeaf {...props} />;
      case LeafType.LineThrough:
        return <LineThrouhLeaf {...props} />;
      case LeafType.BlockquoteNewLine:
        return <BlockquoteNewLine {...props}/>
      default:
        return <DefaultLeaf {...props} />;
    }
  }, []);
