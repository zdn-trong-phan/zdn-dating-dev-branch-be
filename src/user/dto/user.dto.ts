import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ default: 'dfgdsg5435', type: String })
  readonly id: string;

  @ApiProperty({ default: 'trong@gmail.com', type: String })
  readonly email: string;

  @ApiProperty({ default: '423423443', type: String })
  readonly phone: string;

  @ApiProperty({ default: null, type: String, nullable: true })
  readonly socialId: string;
}
