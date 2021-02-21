import React, { useState, useEffect } from 'react';
import { NoteItem } from '../components/NoteItem';
import axios from 'axios';
import { INote } from '../interfaces/INote.interface';

const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

export type INoteListProps = {};

const NoteList: React.FC<INoteListProps> = ({}) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios('http://localhost:3000/notes?limit=10');
        setNotes(data);
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
        <ul className="overflow-auto divide-gray-200 divide-y-1 dark:divide-gray-800">
          {notes.map(({ id, name, content }) => {
            return (
              <NoteItem
                id={id}
                title={name}
                tags={['Tag 1']}
                text={content}
                isSelected={true}
              ></NoteItem>
            );
          })}
        </ul>
      </ScrollBar>
    </>
  );
};

export { NoteList };
