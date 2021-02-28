import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateNoteDto } from './create-note.dto';
import { Note } from './note.entity';
import { UpdateNoteDto } from './update-note.dto';

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
}
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
  ) {}

  async findAll(paginationQuery: PaginationQueryDto, debug = false, debugThrowError: boolean = false) {
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
    });
  }

  async findOne(id: number, debug:boolean = false, debugThrowError: boolean = false) {
    console.log('findOne', id, debug, debugThrowError);
    console.log('typeof debug', typeof debug);
    
    if (debug) {
      console.log('in debug');
      
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

  async create(createNoteDTO: CreateNoteDto, debug = false, debugThrowError: boolean = false) {
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

  async update(id: number, updateNoteDto: UpdateNoteDto, debug = false, debugThrowError: boolean = false) {
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
}
