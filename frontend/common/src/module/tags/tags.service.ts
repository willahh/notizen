import { dispatchCommand } from '../../common/utils';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateTagDTO,
  Mode,
  Tag,
  TagColor,
  TagEntity,
  TagIcon,
} from '../../common/interfaces';
import { getCurrentUserInfo } from '../../database/Auth';
import { createTagAction, CreateTagActionPayload, setTagModeAction, SetTagModeActionPayload } from './tags.actions';

export const createTagAndEdit = async (dispatch) => {
  console.log('createTagAndEdit');

  const userInfo = getCurrentUserInfo();
  const tagId = userInfo.userId + ':' + uuidv4();
  const tagDTO: CreateTagDTO = {
    id: tagId,
    name: 'New tag',
    createDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    isDeleted: false,
    icon: TagIcon.TAG,
    color: TagColor.GRAY,
  };
  const tagEntity: TagEntity = {
    ...tagDTO,
  };
  const createTagActionPayload: CreateTagActionPayload = {
    createTagDTO: tagEntity,
  };
  const tag: Tag = {
    ...tagEntity,
    mode: Mode.Default,
  };

  // TODO: should await this call
  await dispatchCommand({
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
