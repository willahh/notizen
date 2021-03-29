// Define a rendering function based on the element passed to `props`. We use

import { useCallback } from 'react';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import ParagraphElement from '../../plugins/paragraph/paragraph.component';
import HeadingOneElement from '../../plugins/headingone/headingone.component';
import HeadingTwoElement from '../../plugins/headingtwo/headingtwo.component';
import HeadingThreeElement from '../../plugins/headingthree/headingthree.component';
import BulletListElement from '../../plugins/bulletlist/bulletlist.component';
import NumberedListElement from '../../plugins/numberedlist/numberedlist.component';
import BlockQuoteElement from '../../plugins/blockquote/blockquote.component';
import TagElement from '../../plugins/tag/tag.component';
import CodeElement from '../../plugins/code/code.component';
import ImageElement from './elements/ImageElement';

export enum ElementType {
  Default = 'DEFAULT',
  Paragraph = 'PARAGRAPH',
  HeadingOne = 'HEADING_ONE',
  HeadingTwo = 'HEADING_TWO',
  HeadingThree = 'HEADING_THREE',
  Heading4 = 'HEADING4',
  Heading5 = 'HEADING5',
  Heading6 = 'HEADING6',
  BulletList = 'BULLET_LIST',
  BulletListItem = 'BULLET_LIST_ITEM',
  NumberedList = 'NUMBERED_LIST',
  NumberedListItem = 'NUMBERED_LIST_ITEM',
  BlockQuote = 'BLOCK_QUOTE',
  Code = 'CODE',
  Image = 'IMAGE',
  Tag = 'TAG',

  BulletedList = 'BULLETED_LIST',
  ListItem = 'LIST_ITEM',
  Divider = 'DIVIDER',
}

export const renderElement = (editor: Editor & ReactEditor, noteId: string) =>
  useCallback((props) => {
    switch (props.element.type) {
      case ElementType.Default:
        return <ParagraphElement {...props} />;
      case ElementType.Paragraph:
        return <ParagraphElement {...props} />;
      case ElementType.HeadingOne:
        return <HeadingOneElement {...props} />;
      case ElementType.HeadingTwo:
        return <HeadingTwoElement {...props} />;
      case ElementType.HeadingThree:
        return <HeadingThreeElement {...props} />;
      case ElementType.Heading4:
        return <h4 {...props.attributes}>{props.children}</h4>;
      case ElementType.Heading5:
        return <h5 {...props.attributes}>{props.children}</h5>;
      case ElementType.Heading6:
        return <h6 {...props.attributes}>{props.children}</h6>;
      case ElementType.BulletList:
        return <BulletListElement {...props} />;
      case ElementType.BulletListItem:
        return <li {...props.attributes}>{props.children}</li>;

      case ElementType.NumberedList:
        return <NumberedListElement {...props} />;
      case ElementType.NumberedListItem:
        return <li {...props.attributes}>{props.children}</li>;

      case ElementType.Code:
        return <CodeElement {...props} />;
      case ElementType.BlockQuote:
        return <BlockQuoteElement {...props} />;
      case ElementType.Tag:
        return <TagElement {...props} />;
      case ElementType.Image:
        return <ImageElement {...props} />;
      case ElementType.BlockQuote:
        return <blockquote {...props.attributes}>{props.children}</blockquote>;

      // TODO: Refactor / remove
      case ElementType.BulletedList:
        return <ul {...props.attributes}>{props.children}</ul>;
      case ElementType.ListItem:
        return <li {...props.attributes}>{props.children}</li>;
      // TODO
      case ElementType.NumberedList:
        return <li {...props.attributes}>{props.children}</li>;
      case ElementType.Divider:
        return <hr className="bg-black dark:bg-indigo-800 h-1" />;
      default:
        return <ParagraphElement {...props} />;
    }
  }, []);
