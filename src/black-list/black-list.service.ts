import { BlackListDto } from './dto/black-list.dto';
import { THttpResponse } from './../shared/common/http-response.dto';
import { BlackList } from './entities/black-list.entity';
import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { AddBlockedUserDto } from './dto/add-blocked-user.dto';

@Injectable()
export class BlackListService {
  constructor(
    @InjectRepository(BlackList)
    private readonly _blackList: Repository<BlackList>,
    @InjectMapper() private readonly _classMapper: Mapper,
  ) {}

  async addBlockedUser(
    userId: string,
    addBlockUser: AddBlockedUserDto,
  ): Promise<THttpResponse<{ id: string }>> {
    try {
      addBlockUser.userId = userId;

      console.log(addBlockUser);

      const resource = this._classMapper.map(
        addBlockUser,
        AddBlockedUserDto,
        BlackList,
      );

      console.log(resource);

      const result = await this._blackList.save(resource);

      return {
        statusCode: HttpStatus.CREATED,
        data: {
          id: result.id,
        },
      };
    } catch (err) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'Add blocked user failed',
      );
    }
  }

  async getBlockedUser(
    userId: string,
  ): Promise<
    THttpResponse<{ sourceUsers: BlackListDto[]; targetUsers: BlackListDto[] }>
  > {
    try {
      const res = await this._blackList.find({
        where: [{ userId }, { blockedId: userId }],
      });

      const sourceUsers = await this._classMapper.mapArrayAsync(
        res.filter((u) => u.userId === userId),
        BlackList,
        BlackListDto,
      );

      const targetUsers = await this._classMapper.mapArrayAsync(
        res.filter((u) => u.blockedId === userId),
        BlackList,
        BlackListDto,
      );

      return {
        statusCode: HttpStatus.OK,
        data: {
          sourceUsers,
          targetUsers,
        },
      };
    } catch (err) {
      throw new BadRequestException(
        HttpStatus.NOT_FOUND,
        'Not Found Blocked Users',
      );
    }
  }
}
