import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationDto } from './dto/notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly _notificationRepository: Repository<Notification>,
    @InjectMapper() private readonly _classMapper: Mapper,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const toSaveNoti = this._classMapper.map(
      createNotificationDto,
      CreateNotificationDto,
      Notification,
    );
    const notification = this._classMapper.mapAsync(
      await this._notificationRepository.save(toSaveNoti),
      Notification,
      NotificationDto,
    );

    return notification;
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
