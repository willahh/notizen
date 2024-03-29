import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  yCommandsArray,
  executePendingCommands,
  indexeddbProvider,
} from './../../module/sync/Sync';

interface ISyncProps {}

const Sync: React.FC<ISyncProps> = () => {
  console.log('Sync component');

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [actionsQueue, setActionsQueue] = useState(yCommandsArray);
  const [showSyncModal, setShowSyncModal] = useState(false);

  console.log('yCommandsArray.length', yCommandsArray.length);
  

  const updateShowSyncModal = () => {
    console.log('updateShowSyncModal', yCommandsArray.length);

    if (navigator.onLine) {
      if (yCommandsArray.length > 0) {
        setShowSyncModal(true);
      } else {
        setShowSyncModal(false);
      }
    }
  };

  const handleNetworkChange = () => {
    console.log('handleNetworkChange');

    const isOffline = !navigator.onLine;
    setIsOffline(isOffline);
  };

  useEffect(() => {
    indexeddbProvider.whenSynced.then(() => {
      console.log('loaded data from indexed db');
      updateShowSyncModal();
    });

    yCommandsArray.observe((event) => {
      console.log('[x] on yCommandsArray update');
      updateShowSyncModal();
    });

    window.addEventListener('offline', handleNetworkChange);
    window.addEventListener('online', handleNetworkChange);
    return () => {
      window.removeEventListener('offline', handleNetworkChange);
      window.removeEventListener('online', handleNetworkChange);
    };
  }, [window.navigator]);
  useEffect(() => {
    setActionsQueue(yCommandsArray);
  }, [yCommandsArray]);

  return (
    <>
      {showSyncModal && (
        <div className="sync fixed z-10 inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
          {/*
    Notification panel, show/hide based on alert state.

    Entering: "transform ease-out duration-300 transition"
From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
To: "translate-y-0 opacity-100 sm:translate-x-0"
    Leaving: "transition ease-in duration-100"
From: "opacity-100"
To: "opacity-0"
  */}
          <div className="absolute left-6 bottom-6  max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {/* Heroicon name: outline/inbox */}
                  <svg
                    className="h-6 w-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    Des modifications ont été détectées lorsque vous étiez hors
                    en ligne
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Vous devez synchroniser vos modifications.
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={executePendingCommands}
                      className="bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Synchroniser
                    </button>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Close</span>
                    {/* Heroicon name: solid/x */}
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOffline && (
        <div className="sync fixed z-10 inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
          {/*
    Notification panel, show/hide based on alert state.

    Entering: "transform ease-out duration-300 transition"
From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
To: "translate-y-0 opacity-100 sm:translate-x-0"
    Leaving: "transition ease-in duration-100"
From: "opacity-100"
To: "opacity-0"
  */}
          <div className="absolute bottom-6 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {/* Heroicon name: outline/inbox */}
                  <svg
                    className="h-6 w-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>

                {/* <div>
                  {actionsQueue.map((actionQueue) => (
                    <div>
                      <div>{actionQueue.name}</div>
                      <div>{JSON.stringify(actionQueue.payload)}</div>
                    </div>
                  ))}
                </div> */}

                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    Déconnecté
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Vous n'êtes pas connecté. Les changements seront enregistrés
                    sur votre appareil et synchronisés lorsque vous serez de
                    nouveau en ligne.
                  </p>
                  <div className="mt-2">
                    <button className="bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Undo
                    </button>
                    <button className="ml-6 bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Dismiss
                    </button>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Close</span>
                    {/* Heroicon name: solid/x */}
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Sync };
