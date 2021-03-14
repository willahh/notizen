// Define a rendering function based on the element passed to `props`. We use

import React, { useCallback } from 'react';
import { CodeElement } from './code/CodeElement';
import { DefaultElement } from './default/DefaultElement';
import { Heading1Element } from './heading1/Heading1';

export enum BlockType {
  Code = 'CODE',
  Heading1 = 'HEADING1',
}

export const renderElement = (editor) =>
  useCallback((props) => {
    switch (props.element.type) {
      case BlockType.Code:
        return <CodeElement {...props} />;
      case BlockType.Heading1:
        return <Heading1Element {...props} />;
      default:
        return <DefaultElement {...props} editor={editor} />;
    }
  }, []);
