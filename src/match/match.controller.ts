import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { FindMatchDto } from './dto/find-match.dto';
import { Match } from './entities/match.entity';
import { Put } from '@nestjs/common';
import { User } from '../user/decorator/user.decorator';
import { UserDto } from '../user/dto/user.dto';

@ApiTags('Match')
@Controller('match')
export class MatchController {
  constructor(private readonly _matchService: MatchService) {}

  // @ApiOperation({ summary: 'Create' })
  // @Post('/create')
  // create(@Body() matchEntity: Match) {
  //   return this._matchService.create(matchEntity);
  // }

  @ApiOperation({ summary: 'Matching' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post()
  match(@User() user: UserDto, @Body() findMatchDto: FindMatchDto) {
    console.log(user);

    findMatchDto.userId = user.id;
    console.log(findMatchDto);

    return this._matchService.match(findMatchDto);
  }

  // @ApiOperation({ summary: 'Create Match' })
  // @Post('/exist')
  // checkExistMatch(@Body() findMatchDto: FindMatchDto) {
  //   return this._matchService.checkIsMatch(findMatchDto);
  // }

  // @ApiOperation({ summary: 'Get All Match' })
  // @Get('/all')
  // getAll() {
  //   return this._matchService.findAll();
  // }

  // @ApiOperation({ summary: 'Get Match User' })
  // @ApiBearerAuth()
  // @UseGuards(AuthenticationGuard)
  // @Post(@Body() findMatchDto: FindMatchDto)
  // getMatch() {
  //   return this.matchService.findAll();
  // }

  @Delete()
  remove(@Body() match: Match) {
    return this._matchService.remove(match);
  }
}
