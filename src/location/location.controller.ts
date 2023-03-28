import { Controller, Post, Body, Put, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/user/decorator/user.decorator';
import { UserDto } from 'src/user/dto/user.dto';
import { Location } from './entities/location.entity';
import { GetUserWithinDto } from './dto/get-user-within.dto';
import { UpdateTest } from './dto/update-test';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Save Location User' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post()
  create(@User() user: UserDto, @Body() createLocationDto: Location) {
    createLocationDto = { userId: user.id, ...createLocationDto };
    return this.locationService.create(createLocationDto);
  }

  @ApiOperation({ summary: 'Get User With Location Range' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('get-within')
  getWithin(@User() user: UserDto, @Body() getUserWithinDto: GetUserWithinDto) {
    return this.locationService.findUsersWithin(user.id, getUserWithinDto);
  }

  @ApiOperation({ summary: 'Update Location User' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Put()
  update(@User() user: UserDto, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(user.id, updateLocationDto);
  }

  // @ApiOperation({ summary: 'Update Location User' })
  // // @ApiBearerAuth()
  // // @UseGuards(AuthenticationGuard)
  // @Put('/update')
  // updatetest(@Body() updateLocationDto: UpdateTest) {
  //   return this.locationService.updatetest(updateLocationDto);
  // }
}
