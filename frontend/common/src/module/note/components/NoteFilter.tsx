import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { CreateNoteDTO } from '../../../common/interfaces';
import {
  createNoteAction,
  CreateNoteActionPayload,
} from '../note.actions';
import { dispatchCommand } from '../../../common/utils';

export type INoteFilterProps = {};

const NoteFilter: React.FC<INoteFilterProps> = ({}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex-shrink-0 border-b-1 border-gray-200 dark:border-black app-region-drag">
      <div className="flex flex-col justify-center p-2">
        <div className="flex align-middle">
          <div className="flex-none self-center">
            <svg
              className="h-5 w-5 text-gray-400"
              x-description="Heroicon name: solid/search"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-grow self-center">
            <input
              id="search"
              type="search"
              placeholder="Search in notes"
              className="block bg-transparent w-full p-0 pl-2 border-transparent placeholder-gray-500 focus:border-transparent sm:text-sm 
              focus:ring-0"
            />
          </div>
          <div className="flex-none self-center">
            <button
              type="button"
              className="relative inline-flex items-center p-2 rounded-md border-1 border-gray-300 
              text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 
              focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 
               dark:border-gray-800"
              onClick={() => {
                const createNoteDTO: CreateNoteDTO = {
                  id: uuidv4(),
                  name: 'Ma super note',
                  content: []
                };
                const payload: CreateNoteActionPayload = {
                  createNoteDTO: createNoteDTO,
                };
                dispatchCommand({
                  name: createNoteAction.typePrefix,
                  action: createNoteAction(payload),
                  payload,
                  dispatch,
                });
              }}
            >
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NoteFilter };
