import { createTag, deleteTag, getTags } from '../../api/notizenAPI';
import {
  Tags,
  Mode,
  Tag,
  createTagDto,
  TagIcon,
  TagColor,
  updateTagDto,
  TagsResult,
  TagResult,
} from '../../interfaces/INote.interface';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { updateTag } from './../../api/notizenAPI';
import { dispatchCommand, hashCode } from '../../app/utils';
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
  tagId: Number;
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
  createTagDto: createTagDto;
}
export const createTagAction = createAsyncThunk<
  TagResult,
  CreateTagActionPayload
>(actionName, async (payload) => {
  const { createTagDto } = payload;
  return await createTag(createTagDto);
});
addAction(actionName, createTagAction);

actionName = 'tags/addTagActionLocal';
export interface AddTagActionLocalActionPayload {
  tag: Tag;
}
export const addTagActionLocalAction = createAction(
  actionName,
  (payload: AddTagActionLocalActionPayload) => {
    const { tag } = payload;
    return {
      payload: {
        tag: tag,
      },
    };
  }
);
addAction(actionName, addTagActionLocalAction);

actionName = 'tags/update';
export interface UpdateTagActionPayload {
  tagId: number;
  updateTagDto: updateTagDto;
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
  tagId: number;
}
export const deleteTagAction = createAsyncThunk<
  TagResult,
  DeleteTagActionPayload
>(actionName, async (payload) => {
  const { tagId } = payload;
  return await deleteTag(tagId);
});
addAction(actionName, deleteTagAction);

// TODO: Create a standard action
export const createTagAndEditAction = async (dispatch: Dispatch<any>) => {
  console.log('createTagAndEditAction');
  const createTagDto: createTagDto = {
    name: 'Mon tag',
  };

  const payload: CreateTagActionPayload = {
    createTagDto: createTagDto,
  };
  let thunkAction: any = await dispatchCommand({
    name: createTagAction.typePrefix,
    action: createTagAction(payload),
    payload,
    dispatch,
  });

  if (!thunkAction.error) {
    const tag = thunkAction.payload.tag;
    // let action = setTagModeAction(tag, Mode.Edit);
    // await dispatch(action);
    const payloadB: SetTagModeActionPayload = {
      tag: tag,
      mode: Mode.Edit,
    };
    await dispatchCommand({
      name: setTagModeAction.name,
      action: setTagModeAction(payloadB),
      payload: payloadB,
      dispatch,
    });
  } else {
    console.error(thunkAction.error);
  }
};

const tags = createSlice({
  name: 'notes',
  initialState: initialTagsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsAction.pending, (state, action) => {
        console.log('fetchTags.pending', action);
      })
      .addCase(fetchTagsAction.fulfilled, (state, action) => {
        console.log('fetchTags.fulfilled', action);

        const tags = action.payload.tags;
        state.tags = tags;
        state.tagsCache = tags;
      })
      .addCase(createTagAction.pending, (state, action) => {
        console.log('createTagAction.pending', action);

        // Optimistic create
        const requestId = action.meta.requestId;
        const tempTagId = hashCode(requestId);
        const createTagDto = action.meta.arg;
        const tag: Tag = {
          id: tempTagId,
          createDate: new Date(),
          updateDate: new Date(),
          isActive: false,
          mode: Mode.Default,
          name: createTagDto.createTagDto.name,
          icon: TagIcon.TAG,
          color: TagColor.GRAY,
        };
        state.tags[tempTagId] = tag;
      })
      .addCase(createTagAction.fulfilled, (state, action) => {
        console.log('createTagAction.fulfilled', action);

        // Remove temp Tag
        const requestId = action.meta.requestId;
        const tempTagId = hashCode(requestId);
        // console.log('tempTagId', tempTagId);
        // delete state.tags[tempTagId];

        // TODO: Cannot create two Tag with the same name,
        // this should be handled in the backend
        const acc = {};
        const tags = Object.keys(state.tags).reduce((acc: any, k) => {
          if (k && Number(k) != tempTagId) {
            acc[k] = state.tags[k];
          }
          return acc;
        }, acc);
        state.tags = tags;
        state.tagsCache = tags;

        // TODO: api should always return a complete Tag. This
        // is not the case actually, so here is a test.
        let success = action.payload.tag.id !== null;
        if (success) {
          const tag = action.payload.tag;
          const tagId = tag.id;
          state.tags[tagId] = tag;
          state.tagsCache[tagId] = tag;

          // const dispatch = useDispatch();
          // dispatch(setMode(tag, Mode.Edit));
        } else {
          // id is not returned, maybe because the tag already exist
        }
      })
      .addCase(createTagAction.rejected, (state, action) => {
        console.log('createTagAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        // Rollback optimistic create
        // TODO: Display error to user (notification)
        const requestId = action.meta.requestId;
        const tagId = hashCode(requestId);
        delete state.tags[tagId];
      })
      .addCase(addTagActionLocalAction, (state, action) => {
        console.log('addTagActionLocal', action);

        const tag = action.payload.tag;
        const tagId = tag.id;
        state.tags[tagId] = tag;
      })
      .addCase(resetUpdateTagAction, (state, action) => {
        console.log('resetUpdateTag', action);

        const tagId = String(action.payload.tagId);
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
        state.tagsCache[tagId] = tag;
      })
      .addCase(updateTagLocalAction, (state, action) => {
        console.log('updateTagLocal', action);

        const tag = action.payload.tag;
        state.tags[tag.id] = action.payload.tag;
      })
      .addCase(updateTagAction.pending, (state, action) => {
        console.log('updateTagAction.pending', action);

        // Optimistic update
        const tagId = action.meta.arg.tagId;
        const tag = state.tags[tagId];
        const updateTagDto = action.meta.arg.updateTagDto;
        const newTag = { ...tag, updateTagDto, mode: Mode.Default };

        state.tags[tag.id] = newTag;
      })
      .addCase(updateTagAction.fulfilled, (state, action) => {
        console.log('updateTagAction.fulfilled', action);
        const tag = action.payload.tag;
        state.tags[tag.id] = tag;
        state.tagsCache[tag.id] = tag;
      })
      .addCase(updateTagAction.rejected, (state, action) => {
        console.log('updateTagAction.rejected', action);

        if (!navigator.onLine) {
          return;
        }
        // Rollback optimistic update when failure
        // TODO: Display error to user (notification)
        const tagId = action.meta.arg.tagId;
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
      })
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
      .addCase(setModeAction, (state, action) => {
        console.log('setMode', action);
        state.mode = action.payload.mode;
      })
      .addCase(setTagModeAction, (state, action) => {
        console.log('setMode', action);
        const tag = action.payload.tag;
        state.tags[tag.id] = action.payload.tag;
      });
  },
});

export default tags.reducer;
// function dispatch(arg0: { payload: { tag: Tag }; type: 'tags/setMode' }) {
//   throw new Error('Function not implemented.');
// }
