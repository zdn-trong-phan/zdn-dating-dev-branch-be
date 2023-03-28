import { THttpResponse } from './../shared/common/http-response.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly _profileRepository: Repository<Profile>,
    @InjectMapper() private readonly _classMapper: Mapper,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    try {
      const profile = await this._profileRepository.create(createProfileDto);
      return profile;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async save(createProfileDto: CreateProfileDto): Promise<ProfileDto> {
    try {
      const toSaveDto = this._classMapper.map(
        createProfileDto,
        CreateProfileDto,
        Profile,
      );
      const profile = this._classMapper.mapAsync(
        await this._profileRepository.save(toSaveDto),
        Profile,
        ProfileDto,
      );
      return profile;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findOneByUserId(userId: string): Promise<THttpResponse<ProfileDto>> {
    try {
      // const profile = await this._profileRepository.findOne({
      //   where: { userId },
      // });

      // console.log(profile);

      // if (!profile) {
      //   throw new HttpException(
      //     'No profile found with that id!',
      //     HttpStatus.NOT_FOUND,
      //   );
      // }

      const result = await this._classMapper.mapAsync(
        await this._profileRepository.findOne({
          where: { userId },
        }),
        Profile,
        ProfileDto,
      );

      return {
        statusCode: HttpStatus.OK,
        data: result,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async update(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<THttpResponse<void>> {
    try {
      // const toUpdateDto = this._classMapper.map(
      //   updateProfileDto,
      //   UpdateProfileDto,
      //   ProfileDto,
      // );

      await this._profileRepository.update({ userId }, updateProfileDto);

      // console.log(toUpdateDto);

      // console.log(await this._profileRepository.save(toUpdateDto));

      // const updatedProfile = this._classMapper.mapAsync(
      //   await this._profileRepository.save(
      //     Object.assign(profile.data, updateProfileDto),
      //   ),
      //   Profile,
      //   ProfileDto,
      // );

      return {
        statusCode: HttpStatus.NO_CONTENT,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
