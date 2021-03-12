import { v4 as uuidv4 } from 'uuid';
import { createTag, deleteTag, getTags } from '../../api/notizenAPI';
import {
  Tags,
  Mode,
  Tag,
  UpdateTagDTO,
  TagsResult,
  TagResult,
  CreateTagDTO,
  TagEntity,
} from '../../interfaces/INote.interface';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { updateTag } from './../../api/notizenAPI';
import { dispatchCommand } from '../../app/utils';
import { Dispatch } from 'node_modules/@types/react';
import { addAction } from '../../app/actions';

interface TagsState {
  isLoading: boolean;
  error?: string;
  tags: Tags;
  tagsCache: Tags;
  selectedTagId?: number;
  mode: Mode;
  deleteModeActive: boolean; // TODO: Remove use mode
  editModeActive: boolean; // TODO: Remove use mode
}

export const initialTagsState: TagsState = {
  error: undefined,
  isLoading: false,
  selectedTagId: undefined,
  tags: {},
  tagsCache: {},
  deleteModeActive: false,
  editModeActive: false,
  mode: Mode.Default,
};

let actionName = '';

actionName = 'tags/fetch';
export interface FetchTagsActionPayload {}
export const fetchTagsAction = createAsyncThunk<
  TagsResult,
  FetchTagsActionPayload
>(actionName, async () => {
  return await getTags();
});
addAction(actionName, fetchTagsAction);

actionName = 'tags/setTagModeAction';
export interface SetTagModeActionPayload {
  tag: Tag;
  mode: Mode;
}
export const setTagModeAction = createAction(
  actionName,
  (payload: SetTagModeActionPayload) => {
    const { mode, tag } = payload;
    // TODO: No processing here, should be in action.pending
    const updatedTag: Tag = { ...tag, mode: mode };
    return {
      payload: {
        tag: updatedTag,
      },
    };
  }
);
addAction(actionName, setTagModeAction);

actionName = 'tags/setMode';
export interface SetModeActionPayload {
  tag?: Tag; // TODO: not used ?
  mode: Mode;
}
export const setModeAction = createAction(
  actionName,
  (payload: SetModeActionPayload) => {
    const { mode, tag } = payload;
    return {
      payload: {
        mode: mode,
      },
    };
  }
);
addAction(actionName, setModeAction);

actionName = 'tags/updateLocal';
export interface UpdateTagLocalActionPayload {
  tag: Tag;
}
export const updateTagLocalAction = createAction(
  actionName,
  (payload: UpdateTagLocalActionPayload) => {
    const { tag } = payload;
    return {
      payload: {
        tag: tag,
      },
    };
  }
);
addAction(actionName, updateTagLocalAction);

actionName = 'tags/resetUpdateLocal';
export interface ResetUpdateTagActionPayload {
  tagId: string;
}
export const resetUpdateTagAction = createAction(
  actionName,
  (payload: ResetUpdateTagActionPayload) => {
    const { tagId } = payload;
    return {
      payload: {
        tagId: tagId,
      },
    };
  }
);
addAction(actionName, resetUpdateTagAction);

actionName = 'tags/create';
export interface CreateTagActionPayload {
  createTagDTO: CreateTagDTO;
}
export const createTagAction = createAsyncThunk<
  TagResult,
  CreateTagActionPayload
>(actionName, async (payload) => {
  console.log('createTagAction');

  const { createTagDTO } = payload;

  return await createTag(createTagDTO);
});
addAction(actionName, createTagAction);

export const createTagAndEdit = async (
  createTagDTO: CreateTagDTO,
  dispatch: Dispatch<any>
) => {
  console.log('createTagAndEdit');

  const tagEntity: TagEntity = {
    ...createTagDTO,
  };
  const createTagActionPayload: CreateTagActionPayload = {
    createTagDTO: tagEntity,
  };
  const tag: Tag = {
    ...tagEntity,
    mode: Mode.Default,
  };

  // TODO: should await this call
  // await dispatchCommand({
  dispatchCommand({
    name: createTagAction.typePrefix,
    action: createTagAction(createTagActionPayload),
    payload: createTagActionPayload,
    dispatch,
  });

  const setTagModeActionPayload: SetTagModeActionPayload = {
    tag: tag,
    mode: Mode.Edit,
  };
  dispatchCommand({
    name: setTagModeAction.name,
    action: setTagModeAction(setTagModeActionPayload),
    payload: setTagModeActionPayload,
    dispatch,
  });
};

actionName = 'tags/update';
export interface UpdateTagActionPayload {
  tagId: string;
  updateTagDto: UpdateTagDTO;
}
export const updateTagAction = createAsyncThunk(
  actionName,
  async (payload: UpdateTagActionPayload) => {
    const { tagId, updateTagDto } = payload;
    return await updateTag(tagId, updateTagDto);
  }
);
addAction(actionName, updateTagAction);

actionName = 'tags/delete';
export interface DeleteTagActionPayload {
  tagId: string;
}
export const deleteTagAction = createAsyncThunk<
  TagResult,
  DeleteTagActionPayload
>(actionName, async (payload) => {
  const { tagId } = payload;
  return await deleteTag(tagId);
});
addAction(actionName, deleteTagAction);

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

        const tag: Tag = { ...action.meta.arg.createTagDTO, mode: Mode.Default };
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
        const tag: Tag = { ...action.meta.arg.createTagDTO, mode: Mode.Default };
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