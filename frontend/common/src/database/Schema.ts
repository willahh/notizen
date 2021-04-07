// https://codesandbox.io/s/7zo06w5kr0?file=/src/Database.jsx:0-2306
import { RxJsonSchema } from 'rxdb';
import { INote, NoteTagEntity, TagEntity } from './../common/interfaces';

export const noteSchema: RxJsonSchema<INote> = {
  title: 'Note schema',
  description: 'The first version of the Note schema',
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
    // => One to N relations : https://github.com/jo/couchdb-best-practices#user-management
    // ===> Don't !!!!! @see Rule 1: Documents should group data that mostly change together
    // Maybe write a document wich contains the many to many relation.
    tags: {
      type: 'array',
      default: [],
    },
  },
};

export const tagSchema: RxJsonSchema<TagEntity> = {
  title: 'Tag schema',
  description: 'The first version of the Tag schema',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string', // TODO: Check if uuid type exist
      primary: true,
    },
    createDate: {
      type: 'string', // TODO Check if date type exist
      default: '', // TODO: Default date timestamp
    },
    updateDate: {
      type: 'string', // TODO Check if date type exist
      default: '', // TODO: Default date timestamp
    },
    name: {
      type: 'string',
      default: '',
    },
    color: {
      type: 'string',
      default: 'GRAY', // TODO: Use Enum default value
    },
    icon: {
      type: 'string',
      default: 'TAG', // TODO: Use Enum default value
    },
    isDeleted: {
      type: 'boolean',
      default: false,
    },
  },
};

export const notesTagsSchema: RxJsonSchema<NoteTagEntity> = {
  title: 'NotesTags schema',
  description: `NotesTags schema V1. 
  This is used to store relations between notes and tags.`,
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string', // TODO: Check if uuid type exist
      primary: true,
    },
    noteId: {
      type: 'string', // TODO: Check if uuid type exist
    },
    tagId: {
      type: 'string', // TODO: Check if uuid type exist
    },
    createDate: {
      type: 'string', // TODO Check if date type exist
      default: '', // TODO: Default date timestamp
    },
    updateDate: {
      type: 'string', // TODO Check if date type exist
      default: '', // TODO: Default date timestamp
    },
  },
};
