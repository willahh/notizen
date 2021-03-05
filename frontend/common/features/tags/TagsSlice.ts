import { createTag, deleteTag, getTags } from '../../api/notizenAPI';
import {
  Tags,
  Mode,
  Tag,
  createTagDto,
} from '../../interfaces/INote.interface';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { updateTag } from './../../api/notizenAPI';
import { hashCode } from '../../app/utils';

interface TagsState {
  isLoading: boolean;
  error: string | null;
  tags: Tags;
  tagsCache: Tags;
  selectedTagId: number;
  mode: Mode;
  deleteModeActive: boolean; // TODO: Remove use mode
  editModeActive: boolean; // TODO: Remove use mode
}

const initialTagsState: TagsState = {
  error: null,
  isLoading: false,
  selectedTagId: null,
  tags: null,
  tagsCache: null,
  deleteModeActive: false,
  editModeActive: false,
  mode: Mode.Default,
};

export const fetchTags = createAsyncThunk('tags/fetch', async () => {
  console.log('fetchTags thunk');
  return await getTags();
});

export const setTagModeAction = createAction(
  'tags/setTagModeAction',
  (tag: Tag, mode: Mode) => {
    console.log('setTagMode action');
    const updatedTag: Tag = { ...tag, mode: mode };
    return {
      payload: {
        tag: updatedTag,
      },
    };
  }
);

export const setMode = createAction('tags/setMode', (mode: Mode) => {
  return {
    payload: {
      mode: mode,
    },
  };
});

export const updateTagLocal = createAction('tags/updateLocal', (tag: Tag) => {
  return {
    payload: {
      tag: tag,
    },
  };
});

export const resetUpdateTag = createAction(
  'tags/resetUpdateLocal',
  (tagId: Number) => {
    return {
      payload: {
        tagId: tagId,
      },
    };
  }
);

export const createTagAction = createAsyncThunk(
  'tags/create',
  async (createTagDto: createTagDto) => {
    return await createTag(createTagDto);
  }
);

export const updateTagAction = createAsyncThunk(
  'tags/update',
  async ({ tagId, updateTagDto: updateTagDto }: any) => {
    console.log('updateTagAction');
    return await updateTag(tagId, updateTagDto);
  }
);

export const deleteTagAction = createAsyncThunk(
  'tags/delete',
  async (tagId: number) => {
    return await deleteTag(tagId);
  }
);

export const createTagAndEditAction = (dispatch) => {
  console.log('createTagAndEditAction');
  const createTagDto: createTagDto = {
    name: 'Mon tag',
  };
  // TODO: Use of any type because we need to set a special dispatch Type to this action, this is not trivial.
  // @see https://github.com/reduxjs/redux-toolkit/issues/849
  // https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
  const actionThunk: any = dispatch(createTagAction(createTagDto));
  actionThunk.then((action) => {
    console.log('THEN', action);
    if (!action.error) {
      const tag = action.payload.tag;
      dispatch(setTagModeAction(tag, Mode.Edit));
    } else {
      console.warn('err', action.error);
      // TODO: Throw user message
    }
  });
};


const tags = createSlice({
  name: 'notes',
  initialState: initialTagsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state, action) => {
        console.log('fetchTags.pending', action);
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
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
          name: createTagDto.name,
        };
        console.log('tempTagId', tempTagId);

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
        const tags = Object.keys(state.tags).reduce((acc, k) => {
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

        // Rollback optimistic create
        // TODO: Display error to user (notification)
        const requestId = action.meta.requestId;
        const tagId = hashCode(requestId);
        delete state.tags[tagId];
      })
      .addCase(resetUpdateTag, (state, action) => {
        console.log('resetUpdateTag', action);

        const tagId = String(action.payload.tagId);
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
        state.tagsCache[tagId] = tag;
      })
      .addCase(updateTagLocal, (state, action) => {
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

        // Rollback optimistic update when failure
        // TODO: Display error to user (notification)
        const tagId = action.meta.arg.tagId;
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
      })
      .addCase(deleteTagAction.pending, (state, action) => {
        console.log('deleteTagAction.pending', action);

        const tagId = action.meta.arg;
        const newTags = { ...state.tags };
        delete newTags[tagId];
        state.deleteModeActive = false;
        state.tags = newTags;
      })
      .addCase(deleteTagAction.fulfilled, (state, action) => {
        console.log('deleteTagAction.fulfilled', action);
        state.tagsCache = { ...state.tags };
      })
      .addCase(deleteTagAction.rejected, (state, action) => {
        console.log('deleteTagAction.rejected', action);

        const tagId = action.meta.arg;
        const tag = state.tagsCache[tagId];
        state.tags[tagId] = tag;
      })
      .addCase(setMode, (state, action) => {
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
function dispatch(arg0: { payload: { tag: Tag }; type: 'tags/setMode' }) {
  throw new Error('Function not implemented.');
}
