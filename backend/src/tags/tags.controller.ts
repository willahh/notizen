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
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateTagDto } from './create-tag.dto';
import { TagsService } from './tags.service';
import { UpdateTagDto } from './update-tag.dto';

class FindAllClass extends PaginationQueryDto {
  @IsOptional()
  debug: string;

  @IsOptional()
  debugThrowError: string;
}

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(@Query() { debug, debugThrowError, limit, offset }: FindAllClass) {
    return this.tagsService.findAll(
      { limit: limit, offset: offset },
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
    return this.tagsService.findOne(
      id,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Post()
  create(
    @Body() createTagDto: CreateTagDto,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.tagsService.create(
      createTagDto,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.tagsService.update(
      id,
      updateTagDto,
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
    return this.tagsService.remove(
      id,
      debug === 'true',
      debugThrowError === 'true',
    );
  }
}
