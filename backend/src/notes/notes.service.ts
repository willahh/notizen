import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateNoteDto } from './create-note.dto';
import { Note } from './note.entity';
import { UpdateNoteDto } from './update-note.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';


@Injectable()
export class NotesService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    // TODO NEED TO CACH ERROR
    return this.noteRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return note;
  }

  async create(createNoteDTO: CreateNoteDto) {
    const note = this.noteRepository.create(createNoteDTO);
    note.createDate = new Date();
    note.updateDate = note.createDate;
    console.log('note', note);
    
    this.noteRepository.save(note);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
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

  PromiseTimeout(delayms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delayms);
    });
}

  async remove(id: number) {
    console.log('remove', id);
    await this.PromiseTimeout(4000); // For debug
    console.log('after delay');
    throw new RequestTimeoutException(`There is an error in removing note`);
    
    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new NotFoundException(`Note #{id} not found`);
    }
    
    return this.noteRepository.remove(note);
  }
}
