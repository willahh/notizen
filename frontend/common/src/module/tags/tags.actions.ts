import { Dispatch } from 'node_modules/@types/react';
import { createTag, deleteTag, getTags } from '../../common/notizenAPI';
import {
  Mode,
  Tag,
  UpdateTagDTO,
  TagsResult,
  TagResult,
  CreateTagDTO,
  TagEntity,
} from '../../common/interfaces';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { updateTag } from '../../common/notizenAPI';
import { dispatchCommand } from '../../common/utils';
import { addAction } from '../../common/actions';

/**
 * TAGS_FETCH_TAGS
 */
export const TAGS_FETCH_TAGS = 'TAGS/FETCH_TAGS';
export interface FetchTagsActionPayload {}
export const fetchTagsAction = createAsyncThunk<
  TagsResult,
  FetchTagsActionPayload
>(TAGS_FETCH_TAGS, async () => {
  return await getTags();
});
addAction(TAGS_FETCH_TAGS, fetchTagsAction);

/**
 * TAGS_SET_TAG_MODE_ACTION
 */
export const TAGS_SET_TAG_MODE_ACTION = 'TAGS/SET_TAG_MODE_ACTION';
export interface SetTagModeActionPayload {
  tag: Tag;
  mode: Mode;
}
export const setTagModeAction = createAction(
  TAGS_SET_TAG_MODE_ACTION,
  (payload: SetTagModeActionPayload) => {
    const { mode, tag } = payload;
    const updatedTag: Tag = { ...tag, mode: mode };
    return {
      payload: {
        tag: updatedTag,
      },
    };
  }
);
addAction(TAGS_SET_TAG_MODE_ACTION, setTagModeAction);

/**
 * TAGS_SET_MODE
 */
export const TAGS_SET_MODE = 'TAGS/SET_MODE';
export interface SetModeActionPayload {
  tag?: Tag; // TODO: not used ?
  mode: Mode;
}
export const setModeAction = createAction(
  TAGS_SET_MODE,
  (payload: SetModeActionPayload) => {
    const { mode, tag } = payload;
    return {
      payload: {
        mode: mode,
      },
    };
  }
);
addAction(TAGS_SET_MODE, setModeAction);

/**
 * TAGS_UPDATE_TAG_LOCAL
 */
export const TAGS_UPDATE_TAG_LOCAL = 'TAGS/UPDATE_TAG_LOCAL';
export interface UpdateTagLocalActionPayload {
  tag: Tag;
}
export const updateTagLocalAction = createAction(
  TAGS_UPDATE_TAG_LOCAL,
  (payload: UpdateTagLocalActionPayload) => {
    const { tag } = payload;
    return {
      payload: {
        tag: tag,
      },
    };
  }
);
addAction(TAGS_UPDATE_TAG_LOCAL, updateTagLocalAction);

/**
 * TAGS_RESET_UPDATE_LOCAL
 */
export const TAGS_RESET_UPDATE_LOCAL = 'TAGS/RESET_UPDATE_LOCAL';
export interface ResetUpdateTagActionPayload {
  tagId: string;
}
export const resetUpdateTagAction = createAction(
  TAGS_RESET_UPDATE_LOCAL,
  (payload: ResetUpdateTagActionPayload) => {
    const { tagId } = payload;
    return {
      payload: {
        tagId: tagId,
      },
    };
  }
);
addAction(TAGS_RESET_UPDATE_LOCAL, resetUpdateTagAction);

/**
 * TAGS_CREATE_TAG
 */
export const TAGS_CREATE_TAG = 'TAGS/CREATE_TAG';
export interface CreateTagActionPayload {
  createTagDTO: CreateTagDTO;
}
export const createTagAction = createAsyncThunk<
  TagResult,
  CreateTagActionPayload
>(TAGS_CREATE_TAG, async (payload) => {
  console.log('createTagAction');

  const { createTagDTO } = payload;

  return await createTag(createTagDTO);
});
addAction(TAGS_CREATE_TAG, createTagAction);

/**
 * TAGS_ADD_TAG_LOCAL
 */
export const TAGS_ADD_TAG_LOCAL = 'TAGS/ADD_TAG_LOCAL';
export interface AddTagLocalPayload {
  tag: Tag;
}
export const addTagLocal = createAction(
  TAGS_ADD_TAG_LOCAL,
  (payload: AddTagLocalPayload) => {
    const { tag } = payload;
    return {
      payload: {
        tag: tag,
      },
    };
  }
);
addAction(TAGS_ADD_TAG_LOCAL, addTagLocal);

/**
 * TAGS_CREATE_TAG_AND_EDIT
 * Custom action which dispatch 2 commands
 */
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

/**
 * TAGS_UPDATE_TAG
 */
export const TAGS_UPDATE_TAG = 'TAGS/UPDATE_TAG';
export interface UpdateTagActionPayload {
  tagId: string;
  updateTagDto: UpdateTagDTO;
}
export const updateTagAction = createAsyncThunk(
  TAGS_UPDATE_TAG,
  async (payload: UpdateTagActionPayload) => {
    const { tagId, updateTagDto } = payload;
    return await updateTag(tagId, updateTagDto);
  }
);
addAction(TAGS_UPDATE_TAG, updateTagAction);

/**
 * TAGS_DELETE_TAG
 */
export const TAGS_DELETE_TAG = 'TAGS/DELETE_TAG';
export interface DeleteTagActionPayload {
  tagId: string;
}
export const deleteTagAction = createAsyncThunk<
  TagResult,
  DeleteTagActionPayload
>(TAGS_DELETE_TAG, async (payload) => {
  const { tagId } = payload;
  return await deleteTag(tagId);
});
addAction(TAGS_DELETE_TAG, deleteTagAction);
