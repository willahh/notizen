import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './create-note.dto';
import { Note } from './note.entity';
import { UpdateNoteDto } from './update-note.dto';

@Injectable()
export class NotesService {
  constructor(
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
    return this.noteRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOne(id);
    return this.noteRepository.remove(note);
  }
}
