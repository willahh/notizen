import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';

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
export class UsersService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
    return this.userRepository.find({
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
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(
    createUserDTO: CreateUserDto,
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
    const user = this.userRepository.create(createUserDTO);
    user.createDate = new Date();
    user.updateDate = user.createDate;
    return this.userRepository.save(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
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
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    user.updateDate = new Date();
    return this.userRepository.save(user);
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

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #{id} not found`);
    }
    return this.userRepository.remove(user);
  }
}
