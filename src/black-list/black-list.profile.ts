import { ignore } from '@automapper/core';
import { forMember } from '@automapper/core';
import { BlackListDto } from './dto/black-list.dto';
import { BlackList } from './entities/black-list.entity';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { AddBlockedUserDto } from './dto/add-blocked-user.dto';

@Injectable()
export class BlackListProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, BlackList, BlackListDto);
      createMap(
        mapper,
        AddBlockedUserDto,
        BlackList,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
