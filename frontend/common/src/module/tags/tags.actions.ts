import { Dispatch } from 'node_modules/@types/react';
import { createTag, deleteTag, getTags } from '../../notizenAPI';
import {
  Mode,
  Tag,
  UpdateTagDTO,
  TagsResult,
  TagResult,
  CreateTagDTO,
  TagEntity,
} from '../../interfaces';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { updateTag } from '../../notizenAPI';
import { dispatchCommand } from '../../utils';
import { addAction } from '../../actions';

/**
 * tags/fetch
 */
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

/**
 * tags/setTagModeAction
 */
actionName = 'tags/setTagModeAction';
export interface SetTagModeActionPayload {
  tag: Tag;
  mode: Mode;
}
export const setTagModeAction = createAction(
  actionName,
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
addAction(actionName, setTagModeAction);

/**
 * tags/setMode
 */
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

/**
 * tags/updateLocal
 */
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

/**
 * tags/resetUpdateLocal
 */
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

/**
 * tags/create
 */
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

/**
 * tags/createTagAndEdit
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
 * tags/update
 */
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

/**
 * tags/delete
 */
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
