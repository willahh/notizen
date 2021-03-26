/**
 * TODO :
 *  - Display error to user when in rejected action
 */
import { Mode, Tag } from '../../common/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { initialTagsState } from './tags.state';
import {
  addTagLocal,
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
      /**
       * TAGS_FETCH_TAGS
       */
      .addCase(fetchTagsAction.pending, (state, action) => {
        console.log('fetchTags.pending', action);
      })
      .addCase(fetchTagsAction.fulfilled, (state, action) => {
        console.log('fetchTags.fulfilled', action);

        const tags = action.payload.tags;
        state.tags = tags;
        state.tagsCache = tags;
      })

      /**
       * TAGS_CREATE_TAG
       */
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

        const tag: Tag = {
          ...action.meta.arg.createTagDTO,
          mode: Mode.Default,
        };
        const tagId = tag.id;
        delete state.tags[tagId];
      })

      /**
       * TAGS_ADD_TAG_LOCAL
       */
      .addCase(addTagLocal, (state, action) => {
        console.log('addTagLocal', action);

        const tag = action.payload.tag;
        const tagId = tag.id;
        state.tags[tagId] = tag;
        state.tagsCache[tagId] = tag;
      })

      /**
       * TAGS_RESET_UPDATE_LOCAL
       */
      .addCase(resetUpdateTagAction, (state, action) => {
        console.log('resetUpdateTag', action);

        const tagId = String(action.payload.tagId);
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
        state.tagsCache[tagId] = tag;
      })

      /**
       * TAGS_UPDATE_TAG_LOCAL
       */
      .addCase(updateTagLocalAction, (state, action) => {
        console.log('updateTagLocal', action);

        const tag = action.payload.tag;
        const tagId = tag.id;
        state.tags[tagId] = action.payload.tag;
      })

      /**
       * TAGS_UPDATE_TAG
       */
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
        const tagId = tag.id;
        state.tags[tagId] = tag;
        state.tagsCache[tagId] = tag;
      })
      .addCase(updateTagAction.rejected, (state, action) => {
        console.log('updateTagAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }

        const tagId = action.meta.arg.tagId;
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
      })

      /**
       * TAGS_DELETE_TAG
       */
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

        const tagId = action.meta.arg.tagId;
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
      })

      /**
       * TAGS_SET_MODE
       */
      .addCase(setModeAction, (state, action) => {
        console.log('setMode', action);
        state.mode = action.payload.mode;
      })

      /**
       * TAGS_SET_TAG_MODE_ACTION
       */
      .addCase(setTagModeAction, (state, action) => {
        console.log('setMode', action);
        const tag = action.payload.tag;
        state.tags[tag.id] = action.payload.tag;
      });
  },
});

export default tags.reducer;
