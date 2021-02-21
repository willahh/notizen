import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { INote } from '../interfaces/INote.interface';
const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

export type INoteDetailProps = {};

const NoteDetail: React.FC<INoteDetailProps> = ({}) => {
  const noteId = 8;
  const [note, setNote] = useState<INote>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios(`http://localhost:3000/notes/${noteId}`);
        setNote(data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.toString());
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && (
        <p className="error text" style={{ color: '#fff' }}>
          Loading
        </p>
      )}
      {error && (
        <p className="error text" style={{ color: '#fff' }}>
          {error}
        </p>
      )}
      <ScrollBar damping={0.5} thumbMinSize={20}>
        <div className="flex h-full py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8 base-style items-center justify-center bg-gray-50 dark:text-gray-300 dark:bg-gray-900">
          <div
            className="max-w-lg text-justify"
            dangerouslySetInnerHTML={{ __html: note?.content || '' }}
          ></div>
        </div>
      </ScrollBar>
    </>
  );
};

export { NoteDetail };
