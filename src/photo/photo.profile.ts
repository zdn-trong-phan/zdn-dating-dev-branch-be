import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PhotoDto } from './dto/photo.dto';
import { SetAvatarDto } from './dto/set-avatar.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Photo, PhotoDto);
      createMap(
        mapper,
        CreatePhotoDto,
        Photo,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, UpdateFavoriteDto, Photo);
      createMap(mapper, SetAvatarDto, Photo);
    };
  }
}
