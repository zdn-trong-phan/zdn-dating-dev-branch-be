import { THttpResponse } from 'src/shared/common/http-response.dto';
import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCheckedResponse } from '../shared/common/check-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _user: Repository<User>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this._user.create(createUser);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async saveUser(createUser: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this._user.save(createUser);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async isPhoneExist(phone: string): Promise<TCheckedResponse<UserDto>> {
    try {
      const result = await this._user.findOne({ where: { phone } });

      if (!result)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: {
            checked: false,
          },
        };

      return {
        statusCode: HttpStatus.OK,
        data: {
          checked: true,
          data: result,
        },
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async isSocialExist(
    socialId: string,
  ): Promise<TCheckedResponse<{ phone: string }>> {
    try {
      const user = await this._user.findOne({ where: { socialId } });

      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: {
            checked: false,
          },
        };
      }

      return {
        statusCode: HttpStatus.OK,
        data: {
          checked: true,
          data: { phone: user.phone },
        },
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findById(idUser: string): Promise<UserDto> {
    console.log(idUser);

    const response = await this._user.findOne({ where: { id: idUser } });
    console.log(response);

    return response;
  }

  async isUserExist(userId: string): Promise<any> {
    try {
      const result = await this.findById(userId);
      // console.log(result); // if (result) return false;

      if (result) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  findAll() {
    return this._user.find();
  }
}
