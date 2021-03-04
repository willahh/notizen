import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Tag } from '../../interfaces/INote.interface';
import { fetchTags } from './TagsSlice';
import { TagComponent } from './Tag';

interface ITagsProps {}

const Tags: React.FC<ITagsProps> = ({}) => {
  const { error, isLoading, tags } = useSelector(
    (state: RootState) => state.tags
  );
  const deleteModeActive = useSelector(
    (state: RootState) => state.tags.deleteModeActive
  );

  const dispatch = useDispatch();

  console.log('#tags', tags);

  // TODO: Mutualize generic vector->map-of-kv
  const acc: Tag[] = [];
  const tagsList = Object.keys(tags ? tags : [])
    .reduce((acc, v) => {
      if (tags[v]) {
        acc.push(tags[v]);
      }
      return acc;
    }, acc)
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    }); // TODO: refactor sorting

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      {tagsList.map((tag) => (
        <TagComponent tag={tag} deleteModeActive={deleteModeActive} />
      ))}
    </>
  );
};

export { Tags };
