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
import { CreateNoteDTO } from './create-note.dto';
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
    isFav: boolean,
    isDeleted: boolean,
    tagId: string,
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
    console.log('isFav', isFav);
    console.log('isDeleted', isDeleted);

    const qb = await this.connection
      .createQueryBuilder(Note, 'note')
      .leftJoinAndSelect('note.tags', 'tag')
      .orderBy('note.id', 'DESC')
      .addOrderBy('tag.name', 'ASC');
    if (isFav !== undefined) {
      qb.andWhere('note.isFav = :isFav', { isFav });
    }
    if (isDeleted !== undefined) {
      qb.andWhere('note.isDeleted = :isDeleted', { isDeleted });
    }
    if (tagId) {
      qb.andWhere('tag.id = :tagId', { tagId });
    }

    const notes = qb.getMany();

    return notes;
  }

  async findOne(
    id: string,
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
    const note = await this.noteRepository.findOne(id, {
      relations: ['tags'],
    });
    if (!note) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return note;
  }

  async create(
    createNoteDTO: CreateNoteDTO,
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
    await this.noteRepository.save(note);
    const newNote = this.findOne(note.id);

    return newNote;
  }

  async update(
    id: string,
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
    await this.noteRepository.save(note);
    const newNote = this.findOne(note.id);
    return newNote;
  }

  async remove(
    noteId: string,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    console.log('remove', noteId);
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }

    const note = await this.findOne(noteId);
    if (!note) {
      throw new NotFoundException(`Note #{id} not found`);
    }

    return this.noteRepository.remove(note);
  }

  async addTag(
    noteId: string,
    tagId: string,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    console.log('addTag', noteId, tagId);
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }
    let response = null;
    try {
      if (noteId && tagId) {
        await getConnection()
          .createQueryBuilder()
          .relation(Note, 'tags')
          .of(noteId)
          .add(tagId);
        const note = this.findOne(noteId, debug, debugThrowError);
        response = note;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'noteId and tagId required',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
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
    noteId: string,
    tagId: string,
    debug = false,
    debugThrowError: boolean = false,
  ) {
    console.log('removeTag', noteId, tagId);
    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }

    try {
      if (noteId && tagId) {
        await getConnection()
          .createQueryBuilder()
          .relation(Note, 'tags')
          .of(noteId)
          .remove(tagId);
        const note = await this.findOne(noteId, debug, debugThrowError);
        return note;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'noteId and tagId required',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
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
    console.log('createTagAndAddToNote');

    if (debug) {
      await promiseTimeout();
      maybeThrowRandomError();
      if (debugThrowError) {
        throwError();
      }
    }
    let response = null;
    try {
      const { noteId, tagName, tagIcon, tagColor } = noteActionDto;
      const createTagDTO: CreateTagDto = {
        isActive: true,
        name: tagName,
        color: tagColor,
        icon: tagIcon,
      };

      const tag = this.tagRepository.create(createTagDTO);
      tag.createDate = new Date();
      tag.updateDate = tag.createDate;

      const tagCreated = await this.tagRepository.save(tag);
      const tagId = tagCreated.id;

      await getConnection()
        .createQueryBuilder()
        .relation(Note, 'tags')
        .of(noteId)
        .add(tagId);
      const note = await this.findOne(noteId, debug, debugThrowError);
      response = {
        note: note,
        tag: tag,
      };
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
}
