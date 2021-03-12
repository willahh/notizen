import { Mode, Tag } from '../../interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { initialTagsState } from './tags.state';
import {
  createTagAction,
  deleteTagAction,
  fetchTagsAction,
  resetUpdateTagAction,
  setModeAction,
  setTagModeAction,
  updateTagAction,
  updateTagLocalAction,
} from './tags.actions';

const tags = createSlice({
  name: 'notes',
  initialState: initialTagsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTagsAction
      .addCase(fetchTagsAction.pending, (state, action) => {
        console.log('fetchTags.pending', action);
      })
      .addCase(fetchTagsAction.fulfilled, (state, action) => {
        console.log('fetchTags.fulfilled', action);

        const tags = action.payload.tags;
        state.tags = tags;
        state.tagsCache = tags;
      })

      // createTagAction
      .addCase(createTagAction.pending, (state, action) => {
        console.log('createTagAction.pending', action);

        const tag: Tag = {
          ...action.meta.arg.createTagDTO,
          mode: Mode.Default,
        };
        const tagId = tag.id;
        state.tags[tagId] = tag;
      })
      .addCase(createTagAction.fulfilled, (state, action) => {
        console.log('createTagAction.fulfilled', action);

        const tag: Tag = { ...action.payload.tagEntity, mode: Mode.Default };
        const tagId = tag.id;
        state.tags[tagId] = tag;
        state.tagsCache[tagId] = tag;
      })
      .addCase(createTagAction.rejected, (state, action) => {
        console.log('createTagAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }

        // Rollback action
        const tag: Tag = {
          ...action.meta.arg.createTagDTO,
          mode: Mode.Default,
        };
        const tagId = tag.id;
        delete state.tags[tagId];
      })

      // resetUpdateTagAction
      .addCase(resetUpdateTagAction, (state, action) => {
        console.log('resetUpdateTag', action);

        const tagId = String(action.payload.tagId);
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
        state.tagsCache[tagId] = tag;
      })

      // updateTagLocalAction
      .addCase(updateTagLocalAction, (state, action) => {
        console.log('updateTagLocal', action);

        const tag = action.payload.tag;
        state.tags[tag.id] = action.payload.tag;
      })

      // updateTagAction
      .addCase(updateTagAction.pending, (state, action) => {
        console.log('updateTagAction.pending', action);

        const tagId = action.meta.arg.tagId;
        const tag = state.tags[tagId];
        const updateTagDto = action.meta.arg.updateTagDto;
        const newTag = { ...tag, updateTagDto, mode: Mode.Default };

        state.tags[tag.id] = newTag;
      })
      .addCase(updateTagAction.fulfilled, (state, action) => {
        console.log('updateTagAction.fulfilled', action);

        const tag: Tag = { ...action.payload.tagEntity, mode: Mode.Default };
        state.tags[tag.id] = tag;
        state.tagsCache[tag.id] = tag;
      })
      .addCase(updateTagAction.rejected, (state, action) => {
        console.log('updateTagAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }

        // Rollback
        // TODO: Display error to user (notification)
        const tagId = action.meta.arg.tagId;
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
      })

      // deleteTagAction
      .addCase(deleteTagAction.pending, (state, action) => {
        console.log('deleteTagAction.pending', action);

        const tagId = action.meta.arg.tagId;
        const newTags = { ...state.tags };
        delete newTags[tagId];
        state.deleteModeActive = false;
        state.tags = newTags;
      })
      .addCase(deleteTagAction.fulfilled, (state, action) => {
        console.log('deleteTagAction.fulfilled', action);

        const tagId = action.meta.arg.tagId;
        const newTags = { ...state.tags };
        delete newTags[tagId];
        state.tags = newTags;
      })
      .addCase(deleteTagAction.rejected, (state, action) => {
        console.log('deleteTagAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }

        // rollback
        const tagId = action.meta.arg.tagId;
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
      })

      // setModeAction
      .addCase(setModeAction, (state, action) => {
        console.log('setMode', action);
        state.mode = action.payload.mode;
      })

      // setTagModeAction
      .addCase(setTagModeAction, (state, action) => {
        console.log('setMode', action);
        const tag = action.payload.tag;
        state.tags[tag.id] = action.payload.tag;
      });
  },
});

export default tags.reducer;
