// https://codesandbox.io/s/7zo06w5kr0?file=/src/Database.jsx:0-2306
import {
  RxJsonSchema
} from 'rxdb';
import { NoteDocType } from './Database';

export const noteSchema: RxJsonSchema<NoteDocType> = {
  title: 'Note schema',
  description: '',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string', // TODO: Check if uuid type exist
      primary: true,
    },
    name: {
      type: 'string',
      default: '',
    },
    content: {
      type: 'array',
      default: [],
    },
    createDate: {
      type: 'string', // TODO Check if date type exist
      default: '', // TODO: Default date timestamp
    },
    updateDate: {
      type: 'string', // TODO Check if date type exist
      default: '', // TODO: Default date timestamp
    },
    isFav: {
      type: 'boolean',
      default: false,
    },
    isDeleted: {
      type: 'boolean',
      default: false,
    },
    color: {
      type: 'string',
      default: 'GRAY', // TODO: Use Enum default value
    },
    // TODO: Do we need to put this into schema or is there a way to do some relations ?
    tags: {
      type: 'array',
      default: [],
    },
  },
};
