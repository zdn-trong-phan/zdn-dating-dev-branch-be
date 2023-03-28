import {
  Injectable,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { FindMatchDto } from './dto/find-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly _matchRepository: Repository<Match>,
  ) {}

  async create(matchEntity: FindMatchDto) {
    try {
      const matchSave = await this._matchRepository.save({
        ...matchEntity,
        status: false,
      });
      return {
        data: matchSave,
        statusCode: HttpStatus.OK,
        message: 'create success!',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this._matchRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  async update(match: Match) {
    try {
      const matchUpdate: Match = { ...match, status: !match.status };

      const response = await this._matchRepository.save(matchUpdate);
      return {
        data: response,
        statusCode: HttpStatus.OK,
        message: 'matching!',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(matchDelete: Match) {
    try {
      const response = await this._matchRepository.remove(matchDelete);

      return {
        data: response,
        statusCode: HttpStatus.OK,
        message: 'delete success!',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkIsMatch(findMatchDto: FindMatchDto) {
    const { userId, matchedId } = findMatchDto;
    try {
      const response = await this._matchRepository.findOne({
        where: [
          { userId: userId, matchedId: matchedId },
          { userId: matchedId, matchedId: userId },
        ],
      });

      if (!response) {
        return {
          isExist: false,
        };
      }
      return {
        data: response,
        isExist: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async match(findMatch: FindMatchDto) {
    const { userId } = findMatch;
    try {
      // Check exist Match
      // False: Create
      // True: Check Is User Created
      const responseIsMatch = await this.checkIsMatch(findMatch);
      if (!responseIsMatch.isExist) {
        return this.create(findMatch);
      }
      const matchFinded = responseIsMatch.data;
      const isUserCreated = matchFinded.userId === userId;
      // If it is user matched updated status
      if (!isUserCreated) {
        return this.update(matchFinded);
      }
      //Not user matched remove
      return this.remove(matchFinded);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
