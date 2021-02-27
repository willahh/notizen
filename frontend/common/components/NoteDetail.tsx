import React, { useEffect, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { fetchNoteThunk } from '../features/note/noteListSlice';
const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface INoteDetailProps {}

const NoteDetail: React.FC<INoteDetailProps> = ({}) => {
  console.log('NoteDetail');

  const delay = 5;
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );
  // const [show, setShow] = useState(false);
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );

  // TODO showLoading
  const showLoading = true;
  const note = selectedNoteId ? notes[selectedNoteId] : null;

  useEffect(() => {
    console.log('#notedetail effect selectedNoteId', selectedNoteId);

    if (selectedNoteId) {
      dispatch(fetchNoteThunk(selectedNoteId));
    }
    // let timer1 = setTimeout(() => setShow(true), 1000);
    // return () => {
    //   clearTimeout(timer1);
    // };
  }, [dispatch, selectedNoteId]);

  if (error) {
    return (
      <p className="error text" style={{ color: '#fff' }}>
        {error}
      </p>
    );
  }
  if (isLoading && showLoading) {
    return (
      <p className="error text" style={{ color: '#fff' }}>
        Loading
      </p>
    );
  } else {
    return (
      <Suspense fallback={<div>Chargement</div>}>
        <ScrollBar damping={0.5} thumbMinSize={20}>
          <div className="flex h-full py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8 base-style items-center justify-center bg-gray-50 dark:text-gray-300 dark:bg-gray-900">
            <div
              className="max-w-lg text-justify"
              dangerouslySetInnerHTML={{ __html: note?.content || '' }}
            ></div>
          </div>
        </ScrollBar>
      </Suspense>
    );
  }
};

export { NoteDetail };
