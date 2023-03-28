import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

// import { NotificationModule } from './notification/notification.module';

import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { MatchModule } from './match/match.module';
import { BlackListModule } from './black-list/black-list.module';
import { PhotoModule } from './photo/photo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocationModule } from './location/location.module';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';

import { User } from './user/entities/user.entity';
import { Profile } from './profile/entities/profile.entity';
import { Match } from './match/entities/match.entity';
import { Notification } from './notification/entities/notification.entity';
import { Location } from './location/entities/location.entity';
import { Conversation } from './conversation/entities/conversation.entity';
import { Message } from './message/entities/message.entity';
import { BlackList } from './black-list/entities/black-list.entity';
import { Photo } from './photo/entities/photo.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { NotificationModule } from './notification/notification.module';
config();

const entities = [
  User,
  Profile,
  Match,
  Photo,
  Notification,
  BlackList,
  Location,
  Message,
  Conversation,
];
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_ZODINET_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [...entities],
        // entities: ['src/**/entities/*.entity{.ts,.js}'],
        // autoLoadEntities: true,
      }),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    ProfileModule,
    NotificationModule,
    BlackListModule,
    MatchModule,
    ConversationModule,
    MessageModule,
    PhotoModule,
    LocationModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
