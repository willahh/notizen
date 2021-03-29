import { Dispatch } from '@reduxjs/toolkit';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-handlebars.min.js'
import 'prismjs/components/prism-lua.min.js'


import { Editor, Transforms, Range, Node, Text } from 'slate';
import { dispatchCommand } from '../../../../common/utils';
import { ElementType } from '../../components/elements/elements';
import { isNodeActive } from '../../service/editor.action.service';
import {
  setCodeAction,
  SetCodeActionPayload,
  unsetCodeAction,
  UnsetCodeActionPayload,
} from './code.action';

// eslint-disable-next-line
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore
// this is where you customize. If you omit this, it will revert to a default.

Prism.languages.python = Prism.languages.extend('python', {});
Prism.languages.insertBefore('python', 'prolog', {
  comment: { pattern: /##[^\n]*/, alias: 'comment' },
});
Prism.languages.javascript = Prism.languages.extend('javascript', {});
Prism.languages.insertBefore('javascript', 'prolog', {
  comment: { pattern: /\/\/[^\n]*/, alias: 'comment' },
});
Prism.languages.html = Prism.languages.extend('html', {});
Prism.languages.insertBefore('html', 'prolog', {
  comment: { pattern: /<!--[^\n]*-->/, alias: 'comment' },
});
Prism.languages.markdown = Prism.languages.extend('markup', {});
Prism.languages.insertBefore('markdown', 'prolog', {
  blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
  code: [
    { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
    { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
  ],
  title: [
    {
      pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
      alias: 'important',
      inside: { punctuation: /==+$|--+$/ },
    },
    {
      pattern: /(^\s*)#+.+/m,
      lookbehind: !0,
      alias: 'important',
      inside: { punctuation: /^#+|#+$/ },
    },
  ],
  hr: {
    pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
    lookbehind: !0,
    alias: 'punctuation',
  },
  list: {
    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
    lookbehind: !0,
    alias: 'punctuation',
  },
  'url-reference': {
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
      string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      punctuation: /^[\[\]!:]|[<>]/,
    },
    alias: 'url',
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^[*_]|[*_]$/ },
  },
  url: {
    pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
      string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
    },
  },
});
Prism.languages.markdown.bold.inside.url = Prism.util.clone(
  Prism.languages.markdown.url
);
Prism.languages.markdown.italic.inside.url = Prism.util.clone(
  Prism.languages.markdown.url
);
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
  Prism.languages.markdown.italic
);
Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

const getLength = (token) => {
  if (typeof token === 'string') {
    return token.length;
  } else if (typeof token.content === 'string') {
    return token.content.length;
  } else {
    return token.content.reduce((l, t) => l + getLength(t), 0);
  }
};

export const setCode = (editor: Editor, range: Range): Node[] => {
  console.log('setCode');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Code },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const unsetCode = (editor: Editor, range: Range): Node[] => {
  console.log('unsetCode');

  const path = range.anchor.path;
  Transforms.setNodes(
    editor,
    { type: ElementType.Default },
    {
      match: (n) => Editor.isBlock(editor, n),
      at: path,
      split: false,
    }
  );

  return editor.children;
};

export const toggleCode = (
  editor: Editor,
  noteId: string,
  range: Range,
  dispatch: Dispatch<any>
) => {
  console.log('toggleCode');

  if (isNodeActive(editor, ElementType.Code)) {
    const unsetCodeActionPayload: UnsetCodeActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: unsetCodeAction.type,
      action: unsetCodeAction(unsetCodeActionPayload),
      dispatch,
      payload: unsetCodeActionPayload,
    });
  } else {
    const setCodeActionPayload: SetCodeActionPayload = {
      noteId: noteId,
      range: range,
    };
    dispatchCommand({
      name: setCodeAction.type,
      action: setCodeAction(setCodeActionPayload),
      dispatch,
      payload: setCodeActionPayload,
    });
  }
};

export const onEditorEnterKeydown = (event, editor: Editor) => {
  console.log('onEditorEnterKeydown');

  const range = editor.selection;
  const currFragment = Editor.fragment(editor, editor.selection.anchor.path);

  // TODO
  // Create new default at the end of empty quote
  // const currChar = currFragment[0].children[0].text[editor.selection.anchor.offset - 1];
  // debugger;
  if (
    currFragment.length > 0 &&
    currFragment[0].type === ElementType.Code &&
    currFragment[0].children[0].text === ''
  ) {
    console.log('le noeud courant est un code vide');
    event.preventDefault();
    Transforms.setNodes(
      editor,
      { type: ElementType.Default, text: '' },
      {
        match: (n) => Editor.isBlock(editor, n),
        at: editor.selection.anchor.path,
        split: true,
      }
    );
  }

  // Soft line
  event.preventDefault();
  Transforms.insertText(editor, '\n');

  // event.preventDefault();
  // console.log('Transforms.setNodes blockquotenewline');
  // Transforms.insertNodes(
  //   editor,
  //   { type: LeafType.BlockquoteNewLine, text: 'y' },
  //   {
  //     match: (n) => {
  //       return Text.isText(n);
  //     },
  //   }
  // );

  // Transforms.wrapNodes(
  //   editor,
  //   { type: 'DEFAULT' },
  //   { at: editor.selection, split: true }
  // );

  // Transforms.setNodes(
  //   editor,
  //   { type: LeafType.BlockquoteNewLine },
  //   {
  //     at: range,
  //     match: (node) => {
  //       // console.log('match?', Text.isText(node), node);

  //       return Text.isText(node);
  //     },
  //     split: true,
  //   }
  // );
};

export const getDecorateRangeForCode = (
  node: any,
  path: any,
  language: string
) => {
  const ranges = [];
  console.log('#a');

  if (!Text.isText(node)) {
    return ranges;
  }
  console.log('#b');
  const tokens = Prism.tokenize(node.text, Prism.languages[language]);
  console.log('#c');
  console.log('#tokens', tokens);

  let start = 0;

  for (const token of tokens) {
    const length = getLength(token);
    const end = start + length;

    if (typeof token !== 'string') {
      ranges.push({
        [token.type]: true,
        anchor: { path, offset: start },
        focus: { path, offset: end },
      });
    }

    start = end;
  }
  return ranges;
};
