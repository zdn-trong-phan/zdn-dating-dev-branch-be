import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

import { join } from 'path';

const configService = new ConfigService();
console.log(join(__dirname, 'migrations/*{.ts,.js}'));

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_ZODINET_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [join(__dirname, 'src/**/entities/*.ts')],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
});
