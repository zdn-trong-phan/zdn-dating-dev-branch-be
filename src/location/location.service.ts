import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point, Repository } from 'typeorm';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { ProfileService } from '../profile/profile.service';
import { IUserFinded, IUserLocation } from './interface/IUserFinded';
import { THttpResponse } from '../shared/common/http-response.dto';
import { BlackListService } from '../black-list/black-list.service';
import { BlackListDto } from '../black-list/dto/black-list.dto';
import { GetUserWithinDto } from './dto/get-user-within.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly _locationRepository: Repository<Location>,
    private readonly _profileService: ProfileService,
    private readonly _blackListService: BlackListService,
  ) {}

  async create(createLocationDto: Location): Promise<THttpResponse<Location>> {
    try {
      const userExist = await this._locationRepository.findOne({
        where: { userId: createLocationDto.userId },
      });
      if (userExist) {
        return this.update(createLocationDto.userId, {
          long: createLocationDto.long,
          lat: createLocationDto.lat,
        });
      }
      const pointObj: Point = {
        type: 'Point',
        coordinates: [createLocationDto.long, createLocationDto.lat],
      };

      const createdLocation = {
        userId: createLocationDto.userId,
        long: createLocationDto.long,
        lat: createLocationDto.lat,
        location: pointObj,
      };

      const location = await this._locationRepository.save(createdLocation);

      return {
        data: location,
        statusCode: HttpStatus.CREATED,
        message: 'create success!',
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async update(
    userId: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<THttpResponse<Location>> {
    try {
      const location = await this._locationRepository.findOne({
        where: { userId },
      });

      const { long, lat } = updateLocationDto;

      const pointObj: Point = {
        type: 'Point',
        coordinates: [long, lat],
      };

      const updatedLocation = Object.assign(location, {
        long,
        lat,
        location: pointObj,
      });
      await this._locationRepository.save(updatedLocation);

      return {
        data: updatedLocation,
        statusCode: HttpStatus.OK,
        message: 'update success',
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findUsersWithin(
    userId: string,
    getUserWithinDto: GetUserWithinDto,
  ): Promise<THttpResponse<IUserFinded[]>> {
    const { range } = getUserWithinDto;
    try {
      const location = await this._locationRepository.findOne({
        where: { userId },
      });

      const origin = {
        type: 'Point',
        coordinates: [location.long, location.lat],
      };

      const locationUsers: IUserLocation[] = await this._locationRepository
        .createQueryBuilder('location')
        .select([
          'location.user_id AS user',
          'location.long AS long',
          'location.lat AS lat',
          'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance',
        ])
        .where(
          'ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)',
        )
        .orderBy('distance')
        .setParameters({
          // stringify GeoJSON
          origin: JSON.stringify(origin),
          range: range, //KM conversion
        })
        .getRawMany();

      console.log('locations: ', locationUsers);
      // Filter: Array Not Contains User
      if (locationUsers.length === 1) {
        throw new HttpException('Không có người dùng nào lân cận', 201);
      }
      let listLocationUser: IUserLocation[] = locationUsers.filter(
        (location: IUserLocation) => location.user !== userId,
      );
      // console.log(locationUsers);

      // Filter: Array Not Contains Block User
      listLocationUser = await this.filterListUserNotContainBlackList(
        userId,
        listLocationUser,
      );

      const listUserFinded: IUserFinded[] = [];
      for (let i = 0; i < listLocationUser.length; i++) {
        const response = await this._profileService.findOneByUserId(
          listLocationUser[i].user,
        );

        const userFinded: IUserFinded = {
          user: response.data,
          distance: this.round10(listLocationUser[i].distance, -1) * 1000,
          long: listLocationUser[i].long,
          lat: listLocationUser[i].lat,
        };

        listUserFinded.push(userFinded);
      }

      return {
        data: listUserFinded,
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async filterListUserNotContainBlackList(
    idUser: string,
    listUser: IUserLocation[],
  ): Promise<IUserLocation[]> {
    try {
      const resBlockUSer: THttpResponse<{
        sourceUsers: BlackListDto[];
        targetUsers: BlackListDto[];
      }> = await this._blackListService.getBlockedUser(idUser);
      const listUserBlock = resBlockUSer.data.sourceUsers;
      listUserBlock.forEach((userBlock) => {
        listUser.forEach((user, index) => {
          if (userBlock.blockedId === user.user) {
            listUser.splice(index, 1);
          }
        });
      });

      const listUserBlockMe = resBlockUSer.data.targetUsers;
      listUserBlockMe.forEach((userBlock) => {
        listUser.forEach((user, index) => {
          if (userBlock.userId === user.user) {
            listUser.splice(index, 1);
          }
        });
      });

      return listUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  decimalAdjust(type, value, exp) {
    type = String(type);
    if (!['round', 'floor', 'ceil'].includes(type)) {
      throw new TypeError(
        "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'.",
      );
    }
    exp = Number(exp);
    value = Number(value);
    if (exp % 1 !== 0 || Number.isNaN(value)) {
      return NaN;
    } else if (exp === 0) {
      return Math[type](value);
    }
    const [magnitude, exponent = 0] = value.toString().split('e');
    const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
    // Shift back
    const [newMagnitude, newExponent = 0] = adjustedValue.toString().split('e');
    return Number(`${newMagnitude}e${+newExponent + exp}`);
  }
  round10(value, exp) {
    return this.decimalAdjust('round', value, exp);
  }

  // async updatetest(updateLocationDto: UpdateTest) {
  //   try {
  //     const location = await this._locationRepository.findOne({
  //       where: { userId: updateLocationDto.userId },
  //     });

  //     const { long, lat } = updateLocationDto;

  //     const pointObj: Point = {
  //       type: 'Point',
  //       coordinates: [long, lat],
  //     };

  //     const updatedLocation = Object.assign(location, {
  //       long,
  //       lat,
  //       location: pointObj,
  //     });
  //     const response = await this._locationRepository.save(updatedLocation);
  //     return { data: response, statusCode: HttpStatus.OK };
  //   } catch (err) {
  //     throw new BadRequestException(err.message);
  //   }
  // }
}
