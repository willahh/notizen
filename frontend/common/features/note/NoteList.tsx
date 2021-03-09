import React, { useEffect } from 'react';
import { NoteItem } from '../../components/NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { fetchNotes } from './noteListSlice';
import { AreaSecondary } from '../../components/AreaSecondary';
import { NoteFilter } from '../../components/NoteFilter';
import { MainArea } from '../../components/MainArea';
import { Toolbar } from '../../components/Toolbar';
import { NoteDetailEdit } from '../../components/NoteDetailEdit';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { LOCAL_STORAGE_NOTES_KEY } from '../../constants';
import MainTemplate from '../../components/MainTemplate';
import { INote } from '../../interfaces/INote.interface';
// const scrollbar = require('smooth-scrollbar-react');
// const ScrollBar = scrollbar.default;

interface INoteProps {}

const NoteList: React.FC<INoteProps> = () => {
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  // TODO: Mutualize generic vector->map-of-kv
  const acc: INote[] = [];
  const notesList = Object.keys(notes)
    .reduce((acc, v) => {
      if (notes[v]) {
        acc.push(notes[v]);
      }
      return acc;
    }, acc)
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    }); // TODO: refactor sorting

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  let noteListHtml = null;
  // let match = useRouteMatch();

  if (error) {
    noteListHtml = (
      <p className="error text" style={{ color: '#fff' }}>
        {error}
      </p>
    );
  }

  if (isLoading) {
    noteListHtml = (
      <p className="error text" style={{ color: '#fff' }}>
        Loading
      </p>
    );
  } else {
    noteListHtml = (
      /* <ScrollBar damping={0.5} thumbMinSize={20}> */
      <TransitionGroup
        component="ul"
        className="overflow-auto divide-y-1 divide-gray-200 dark:divide-gray-800"
        type="ul"
      >
        {notesList.map(
          ({
            id,
            name,
            content,
            createDate,
            updateDate,
            tags,
            color,
            isFav,
          }) => {
            return (
              <CSSTransition key={id} timeout={400} classNames="item">
                {/* <div>a</div> */}
                <NoteItem
                  key={id}
                  id={id}
                  createDate={createDate}
                  updateDate={updateDate}
                  name={name}
                  tags={tags}
                  content={content}
                  isSelected={true}
                  color={color}
                  isFav={isFav}
                ></NoteItem>
              </CSSTransition>
            );
          }
        )}
      </TransitionGroup>
    );
  }

  return (
    <MainTemplate>
      <div className="flex w-full flex-col">
        <div>
          <Toolbar />
        </div>
        <div className="flex h-full">
          <AreaSecondary>
            <NoteFilter />
            {noteListHtml}
          </AreaSecondary>
          <MainArea>
            <NoteDetailEdit />
          </MainArea>
        </div>
      </div>
    </MainTemplate>
  );
};

export { NoteList };
