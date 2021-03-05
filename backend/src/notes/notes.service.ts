import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateNoteDto } from './create-note.dto';
import { Note } from './note.entity';
import { UpdateNoteDto } from './update-note.dto';
import { Tag } from 'src/tags/tag.entity';
import { NoteActionDto } from './note-action.dto';
import { CreateTagDto } from 'src/tags/create-tag.dto';

const debugTimeoutDelay = () => {
  return Math.round(Math.random() * 2000);
};
const promiseTimeout = () => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, debugTimeoutDelay());
  });
};
const throwError = () => {
  throw new RequestTimeoutException(`Here is a random server error !!!!`);
};
const maybeThrowRandomError = () => {
  const vals = [false, false, false, true, true];
  const random = Math.floor(Math.random() * vals.length);
  const didThrowError = vals[random];

  if (didThrowError) {
    throwError();
  }
};

@Injectable()
export class NotesService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(
    paginationQuery: PaginationQueryDto,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }
    const { limit, offset } = paginationQuery;
    // TODO NEED TO CACH ERROR
    return this.noteRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(
    id: number,
    debug: boolean = false,
    debugThrowError: boolean = false,
  ) {
    console.log('findOne', id, debug, debugThrowError);
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }
    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return note;
  }

  async findOneDetailed(
    id: number,
    debug: boolean = false,
    debugThrowError: boolean = false,
  ) {
    console.log('findOneDetailed', id, debug, debugThrowError);
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }

    const note = await this.noteRepository.findOne(id, {
      relations: ["tags"]
    });
    if (!note) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return note;
  }

  async create(
    createNoteDTO: CreateNoteDto,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }
    const note = this.noteRepository.create(createNoteDTO);
    note.createDate = new Date();
    note.updateDate = note.createDate;
    console.log('note', note);

    return this.noteRepository.save(note);
  }

  async update(
    id: number,
    updateNoteDto: UpdateNoteDto,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }
    const note = await this.noteRepository.preload({
      id: id,
      ...updateNoteDto,
    });
    if (!note) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    note.updateDate = new Date();
    return this.noteRepository.save(note);
  }

  async remove(id: number, debug = false, debugThrowError: boolean = false) {
    console.log('remove', id);
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }

    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new NotFoundException(`Note #{id} not found`);
    }

    return this.noteRepository.remove(note);
  }

  async addTag(
    noteId: number,
    tagName: string,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    console.log('addTag', noteId, tagName);
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }
    let response = null;
    try {
      response = await getConnection()
        .createQueryBuilder()
        .relation(Note, 'tags')
        .of(noteId)
        .add(tagName);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.detail,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return response;
  }

  async removeTag(
    noteId: number,
    tagName: string,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    console.log('removeTag', noteId, tagName);
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }

    let response = null;
    try {
      response = await getConnection()
        .createQueryBuilder()
        .relation(Note, 'tags')
        .of(noteId)
        .remove(tagName);
      console.log('response', response);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.detail,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTagAndAddToNote(
    noteActionDto: NoteActionDto,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }
    let note = null;
    try {
      const { noteId, tagName } = noteActionDto;
      const createTagDTO: CreateTagDto = {
        isActive: true,
        name: tagName,
      };

      const tag = this.tagRepository.create(createTagDTO);
      tag.createDate = new Date();
      tag.updateDate = tag.createDate;
      await this.tagRepository.save(tag);

      await getConnection()
        .createQueryBuilder()
        .relation(Note, 'tags')
        .of(noteId)
        .add(tagName);
      note = await this.noteRepository.findOne(noteId);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.detail,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return note;
  }
}
