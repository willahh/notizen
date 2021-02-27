import React, { useEffect } from 'react';
import { NoteItem } from '../../components/NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { fetchNotes } from './noteListSlice';
import { AreaSecondary } from '../../components/AreaSecondary';
import { NoteFilter } from '../../components/NoteFilter';
import { MainArea } from '../../components/MainArea';
import { Toolbar } from '../../components/Toolbar';
import { NoteDetail } from '../../components/NoteDetail';
import MainTemplate from '../../components/MainTemplate';
import { setSelectedNoteId } from './noteDetailSlice';

const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface INoteProps {}

const Note: React.FC<INoteProps> = () => {
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );

  const selectedNoteId = useSelector(
    (state: RootState) => state.noteDetail.selectedNoteId
  );

  console.log('====> notes', notes);
  console.log('selectedNoteId', selectedNoteId);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  if (error) {
    return (
      <p className="error text" style={{ color: '#fff' }}>
        {error}
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="error text" style={{ color: '#fff' }}>
        Loading
      </p>
    );
  } else {
    return (
      <MainTemplate>
        <AreaSecondary>
          <NoteFilter />
          {/* <ScrollBar damping={0.5} thumbMinSize={20}> */}
            <ul className="overflow-auto divide-gray-200 divide-y-1 dark:divide-gray-800">
              {notes.map(({ id, name, content }) => {
                return (
                  <NoteItem
                    key={id}
                    id={id}
                    title={name}
                    tags={['Tag 1']}
                    text={content}
                    isSelected={true}
                  ></NoteItem>
                );
              })}
            </ul>
          {/* </ScrollBar> */}
        </AreaSecondary>
        <MainArea>
          <Toolbar />
          <NoteDetail />
        </MainArea>
      </MainTemplate>
    );
  }
};

export { Note };
