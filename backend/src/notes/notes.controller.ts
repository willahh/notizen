import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { TagsService } from 'src/tags/tags.service';
import { PaginationQueryDto } from './../common/dto/pagination-query.dto';
import { CreateNoteDto } from './create-note.dto';
import { NoteActionDto, NoteAction } from './note-action.dto';
import { NotesService } from './notes.service';
import { UpdateNoteDto } from './update-note.dto';

interface findAll extends PaginationQueryDto {
  debug: false;
  debugThrowError: false;
}

class FindAllClass extends PaginationQueryDto {
  @IsOptional()
  debug: string;

  @IsOptional()
  debugThrowError: string;
}

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly tagsService: TagsService,
  ) {}

  @Get()
  findAll(@Query() { debug, debugThrowError, limit, offset }: FindAllClass) {
    return this.notesService.findAll(
      { limit: limit, offset: offset },
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.notesService.findOne(
      id,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Get(':id/detailed')
  findOneWithTags(
    @Param('id') id: number,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.notesService.findOneDetailed(
      id,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.notesService.create(
      createNoteDto,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.notesService.update(
      id,
      updateNoteDto,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Delete(':id')
  delete(
    @Param('id') id: number,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.notesService.remove(
      id,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Post('/:id/actions')
  addTag(
    @Param('id') noteId: number,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
    @Body() noteActionDto: NoteActionDto,
  ) {
    const { tagName, tagId } = noteActionDto;
    switch (noteActionDto.actionType) {
      case NoteAction.AddTag:
        return this.notesService.addTag(
          noteId,
          tagId,
          debug === 'true',
          debugThrowError === 'true',
        );
        break;
      case NoteAction.RemoveTag:
        return this.notesService.removeTag(
          noteId,
          tagId,
          debug === 'true',
          debugThrowError === 'true',
        );
        break;
      case NoteAction.CreateTagAndAddToNote:
        return this.notesService.createTagAndAddToNote(
          { ...noteActionDto, noteId: noteId },
          debug === 'true',
          debugThrowError === 'true',
        );
        break;
    }
  }
}
