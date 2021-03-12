/**
 * Notes: TODO
 *  Pour la partie ACTIONS, pas pour la partie Editeur qui viendra
 *  - Il faut utiliser des uuid partout (maj le backend)
 *  - On peut tout créer en local offline first, création d'une note avec un UUID
 *      - Maj de la note 1, maj de la note 2, ...
 *  - Un écouteur sur les actions redux est ajouté
 *  - On ajoute toutes les actions dans une liste
 *  - Lorsque l'utilisateur revient en ligne, on rejoue toutes les actions
 *  - Peut voir pour jouer avec une transaction pas sur car si une action fail côté serveur ça va tout stoper
 *  - Du coup l'utilisateur revient en ligne, on lance toutes les actions séquentiellement
 *
 *  Cela peut fonctionner
 *
 *  Il faut que de base si on se met en ligne tout soit utilisable, faire gaffe aux order by
 *
 * La partie éditeur elle peut se basée sur YDOC, mais pas forcément nécessaire pour les actions redux.
 */

import React, { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { useRef } from 'react';
import { store } from './../../store';
import { Command } from '../../utils';
import { actionNameToAction } from '../../actions';

export const ydoc = new Y.Doc();
const roomName = 'notizen';

// persistence
export const indexeddbProvider = new IndexeddbPersistence(roomName, ydoc);

// ydoc.on('update', (update: any) => {
//   console.log('on ydoc update', update);
// });

// Define an instance of Y.Array named "my array"
// Every peer that defines "my array" like this will sync content with this peer.
export const yCommandsArray = ydoc.getArray('commands');

// We can register change-observers like this
// yCommandsArray.observe((event) => {
//   console.log('on yarray change', event);

//   // Log a delta every time the type changes
//   // Learn more about the delta format here: https://quilljs.com/docs/delta/
//   console.log('delta:', event.changes.delta);
// });

// There are a few caveats that you need to understand when working with shared types
// It is best to explain this in a few lines of code:

// We can insert & delete content
// yarray.insert(0, ['some content']); // => delta: [{ insert: ['some content'] }]

// Note that the above method accepts an array of content to insert.
// So the final document will look like this:
// console.log('yarray.toArray()', yCommandsArray.toArray());





// ----------------------------------
// Queue of Commands
export const addCommandToCommandsQueue = async (command: Command) => {
  console.log('[x] [addCommandToCommandsQueue]', command);

  const { action, dispatch, name, payload } = command;

  // Only add to queue when offline
  if (!navigator.onLine) {
    const index = yCommandsArray.length;
    yCommandsArray.insert(index, [command]);
  }
  return await dispatch(action);
};

export const executePendingCommands = () => {
  console.log('[x] executePendingCommands');

  const commands: any = yCommandsArray.toArray();

  commands.forEach(async (command: any) => {
    console.log('[x] command', command, command.action);

    const actionFn = actionNameToAction.get(command.name);
    if (actionFn) {
      await store.dispatch(actionFn(command.payload));
      // TODO: Need to store failure actions and implement retry or something ...
      try {
        yCommandsArray.delete(0) // Remove the entry after played it
      } catch (err) {
        console.error(`Cannot delete yCommandsArray at index 0 : ${err}`)
      }
    } else {
      console.error(`Redux Action function not found for command: ${command.name}`)
    }
    // TODO: Catch action error
    // store.dispatch(action).then((action: any) => {
    //   console.log('[x] THEN', action);
    //   if (!action.error) {

    //   } else {
    //     console.warn('[x] action err', action.error);
    //   }
    // });
  });

  indexeddbProvider.clearData();
};

// window debugs --------------------
// window.yCommandsArray = yCommandsArray;
// window.Y = Y;
// window.ydoc = ydoc;
// window.persistence = indexeddbProvider;















// debug view form --------------------
export type ISyncProps = {};

const Form: React.FC = () => {
  const [value, setValue] = useState('');

  const insert = (index: number, v: any[]) => {
    console.log('insert', index, v);
    yCommandsArray.insert(0, v);
  };
  const inputValueRef = useRef();
  return (
    <form>
      {/* <table>
        <tbody>
          <tr>
            <td>value: </td>
            <td>
              <input ref={inputValueRef} type="text" />
            </td>
          </tr>
        </tbody>
      </table> */}
      <button
        onClick={(e) => {
          e.preventDefault();

          // console.log(
          //   'inputValueRef.current.value',
          //   inputValueRef.current?.value
          // );
          // const v = inputValueRef.current?.value;

          // insert(0, [v]);
        }}
      >
        Insert{' '}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log('apply updates');

          const state1 = Y.encodeStateAsUpdate(ydoc);
          // const state2 = Y.encodeStateAsUpdate(ydoc2);
          Y.applyUpdate(ydoc, state1);

          // ... save to database

          // ... Remove Indexeddb persistance
          indexeddbProvider.clearData();

          // Y.applyUpdate(ydoc2, state1);

          // // encode the current state as a binary buffer
          // let currentState1 = Y.encodeStateAsUpdate(ydoc)
          // // let currentState2 = Y.encodeStateAsUpdate(ydoc2)
          // // now we can continue syncing clients using state vectors without using the Y.Doc
          // ydoc.destroy()
          // // ydoc2.destroy()

          // const stateVector1 = Y.encodeStateVectorFromUpdate(currentState1)
          // // const stateVector2 = Y.encodeStateVectorFromUpdate(currentState2)
          // const diff1 = Y.diffUpdate(currentState1, stateVector2)
          // // const diff2 = Y.diffUpdate(currentState2, stateVector1)

          // // sync clients
          // currentState1 = Y.mergeUpdates([currentState1, diff2])
          // // currentState1 = Y.mergeUpdates([currentState1, diff1])
        }}
      >
        Apply updates
      </button>
    </form>
  );
};

const SyncComponent: React.FC<ISyncProps> = ({}) => {
  console.log('view : yarray', yCommandsArray, yCommandsArray.length);

  const [arrDebug, setArrDebug] = useState([]);

  useEffect(() => {
    yCommandsArray.observe((event) => {
      console.log('[SyncComponent] on yarray change', event);

      // Log a delta every time the type changes
      // Learn more about the delta format here: https://quilljs.com/docs/delta/
      // console.log('delta:', event.changes.delta);
      // const data = event.target?.toArray();
      // setArrDebug(data);
    });
  }, [yCommandsArray]);

  return (
    <div className="text-black">
      <h3>yarray</h3>
      <div className="max-h-56 overflow-auto">
        <table>
          <tbody>
            {arrDebug &&
              arrDebug.map((v) => {
                return (
                  <tr>
                    <td>value : </td>
                    <td>{v}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Form />
    </div>
  );
};

export { SyncComponent as Sync };
