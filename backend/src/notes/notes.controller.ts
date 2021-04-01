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
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { TagsService } from 'src/tags/tags.service';
import { PaginationQueryDto } from './../common/dto/pagination-query.dto';
import { CreateNoteDTO } from './create-note.dto';
import { NoteActionDto, NoteAction } from './note-action.dto';
import { NotesService } from './notes.service';
import { UpdateNoteDto } from './update-note.dto';

interface findAll extends PaginationQueryDto {
  debug: false;
  debugThrowError: false;
}

const toBoolean = (t, fieldName) => {
  let ret = undefined;
  if (t.obj[fieldName] === 'true') {
    ret = true;
  } else if (t.obj[fieldName] === 'false') {
    ret = false;
  } else {
    ret = undefined;
  }
  return ret;
};

class FindAllClass extends PaginationQueryDto {
  @IsOptional()
  debug: string;

  @IsOptional()
  debugThrowError: string;

  @IsBoolean()
  @Transform((t) => toBoolean(t, 'isFav'), { toClassOnly: true })
  @IsOptional()
  readonly isFav: boolean;

  @IsBoolean()
  @Transform((t) => toBoolean(t, 'isDeleted'), { toClassOnly: true })
  @IsOptional()
  readonly isDeleted: boolean;

  @IsUUID()
  @IsOptional()
  tagId: string;
}

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly tagsService: TagsService,
  ) {}

  @Get()
  findAll(
    @Query()
    {
      debug,
      debugThrowError,
      limit,
      offset,
      isFav,
      isDeleted,
      tagId,
    }: FindAllClass,
  ) {
    console.log('-->> isFav', isFav);
    console.log('-->> isDeleted', isDeleted);

    return this.notesService.findAll(
      { limit, offset },
      isFav,
      isDeleted,
      tagId,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.notesService.findOne(
      id,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDTO,
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
    @Param('id') id: string,
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
    @Param('id') id: string,
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
    @Param('id') noteId: string,
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
