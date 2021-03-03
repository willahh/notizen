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
import { PaginationQueryDto } from './../common/dto/pagination-query.dto';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';

class FindAllClass extends PaginationQueryDto {
  @IsOptional()
  debug: string;

  @IsOptional()
  debugThrowError: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() { debug, debugThrowError, limit, offset }: FindAllClass) {
    return this.usersService.findAll(
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
    return this.usersService.findOne(
      id,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.usersService.create(
      createUserDto,
      debug === 'true',
      debugThrowError === 'true',
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Query('debug') debug,
    @Query('debugThrowError') debugThrowError,
  ) {
    return this.usersService.update(
      id,
      updateUserDto,
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
    return this.usersService.remove(
      id,
      debug === 'true',
      debugThrowError === 'true',
    );
  }
}
