import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTagDto } from './create-tag.dto';
import { UpdateTagDto } from './update-tag.dto';
import { Tag } from './tag.entity';
import { getConnection } from 'typeorm';

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
export class TagsService {
  constructor(
    private readonly connection: Connection,
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
    return this.tagRepository.find({
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
    const tag = await this.tagRepository.findOne({ where: { id: id } });
    if (!tag) {
      throw new NotFoundException(`Tag #${id} not found`);
    }
    return tag;
  }

  async create(
    createTagDTO: CreateTagDto,
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
    const tag = this.tagRepository.create(createTagDTO);
    console.log('tag', tag);
    
    tag.createDate = new Date();
    tag.updateDate = tag.createDate;

    const newTag = this.tagRepository.save(tag);
    
    return newTag;
  }

  async update(
    id: number,
    updateTagDto: UpdateTagDto,
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
    console.log('updateTagDto', id, updateTagDto);

    let tag = await this.tagRepository.findOne({ where: { id: id } });
    if (!tag) {
      throw new NotFoundException(`Tag #${id} not found`);
    }
    const tagUpdated = await getConnection()
      .createQueryBuilder()
      .update(Tag)
      .set({ name: updateTagDto.name, updateDate: new Date() })
      .where('name = :name', { name: tag.name })
      .execute();
    tag.name = updateTagDto.name;

    return tag;
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

    const tag = await this.tagRepository.findOne({ where: { id: id } });
    if (!tag) {
      throw new NotFoundException(`Tag #{id} not found`);
    }
    return this.tagRepository.remove(tag);
  }
}
