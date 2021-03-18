import React, { useMemo, useState, useCallback } from 'react';

/***
 *
 *
 *
 * - Montre une page (représentation d'un page)
 *   Fond sombre + page en blanc
 * - Mettre le coeur en rouge / rose - trop petit
 *
 * Notion de page dans des notes
 *
 * Personne qui note des cours
 *  - Chapitre / page
 *
 *  - Marges latérales
 *  - Entête
 *  - Bas de page
 *  - Numéro de page en bas à droite
 *  - COmmentaire
 *  - Surlignage  en toggle :
 *    []
 *    - Toggle surlignage ON : tous les textes sélectionés sont surlignés
 *
 *   Bold / Italic / Strike en toggle
 *
 *  - [ ] Représenter des pages et des petites pages
 *
 * Une page commence à la taille d'un post-it et si trop taille max page a4 sio n écrit plus ajoute des pages
 *
 *   - [ ] Notion de portrait ou paysage
 *   - [ ]
 *
 * - Une section peut etre de type post-it ou page
 *  (une section est un item 2 eme colonne
 *
 *  - Postit mode :
 *    (n postits et un + pour ajouter) en grille
 *    [ ] [ ] +
 *    [ ] [ ]
 *    [ ] [ ]
 *
 *
 *  - Sections
 *    - Pages
 *    - Stick (Post-it)
 *
 *  - Laisser les bandes de couleur visible sur les sections
 *
 *  - Section
 *  somaire :
 * Partie I.
 * Section I.
 * Chapitre I.
 * I.
 * A.
 * 1.
 * 2.
 * B.
 * 1.
 * 2.
 * II..
 * Chapitre II.
 * Section II.
 * Partie II.
 *
 *
 * Mode Light / Dark / Dark + page blanche
 *
 */

// Import the Slate editor factory.
import { createEditor, Editor, Node } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Commands } from './Commands';
import { HoveringToolbar } from './plugins/hoveringToolbar/HoveringToolbar';
import { renderElement } from './elements/elements';

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      className={`${props.leaf.bold ? `font-bold` : ``}`}
      // style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

interface IEditor {
  editor: Editor & ReactEditor;
  nodes: Node[];
}

export const NotizenEditor: React.FC<IEditor> = ({ editor, nodes }) => {
  console.log('NotizenEditor', nodes);

  // Keep track of state for the value of the editor.
  // const [value, setValue] = useState(node);
  const [value, setValue] = useState(nodes);
  console.log('xx ', value);

  const renderElementMemoized = renderElement(editor);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value: any) => {
        console.log('onChange', value);

        setValue(value);
      }}
    >
      <HoveringToolbar />
      <Editable
        renderElement={renderElementMemoized}
        renderLeaf={renderLeaf}
        className="text-black dark:text-white"
        onKeyDown={(event) => {
          console.log('on key down');
          if (!event.ctrlKey) {
            return;
          }

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case 'p': {
              event.preventDefault();
              Commands.toggleCodeBlock(editor);
              break;
            }

            case 'b': {
              event.preventDefault();
              Commands.toggleBoldMark(editor);
              break;
            }

            case 'h': {
              event.preventDefault();
              Commands.toggleHeading1Block(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default NotizenEditor;
