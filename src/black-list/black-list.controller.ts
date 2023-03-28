import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BlackListService } from './black-list.service';
import { AddBlockedUserDto } from './dto/add-blocked-user.dto';
import { User } from '../user/decorator/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { THttpResponse } from '../shared/common/http-response.dto';
import { BlackListDto } from './dto/black-list.dto';

@Controller('black-list')
export class BlackListController {
  constructor(private readonly blackListService: BlackListService) {}

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post()
  async addBlockedUser(@User() user, @Body() addBlockUser: AddBlockedUserDto) {
    const { id } = user;
    return await this.blackListService.addBlockedUser(id, addBlockUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Get()
  async getBlockedUser(
    @User() user,
  ): Promise<
    THttpResponse<{ sourceUsers: BlackListDto[]; targetUsers: BlackListDto[] }>
  > {
    const { id } = user;
    return await this.blackListService.getBlockedUser(id);
  }
}
