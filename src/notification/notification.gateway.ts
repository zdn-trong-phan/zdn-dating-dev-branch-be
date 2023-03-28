import { HttpStatus } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { THttpResponse } from 'src/shared/common/http-response.dto';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly _notificationService: NotificationService) {}

  @SubscribeMessage('createNotification')
  async create(
    @MessageBody() createNotificationDto: CreateNotificationDto,
  ): Promise<THttpResponse<NotificationDto>> {
    const notification = await this._notificationService.create(
      createNotificationDto,
    );

    this.server.emit(`noti-${notification.userFromId}`, notification);
    this.server.emit(`noti-${notification.userToId}`, notification);

    return {
      statusCode: HttpStatus.OK,
      data: notification,
    };
  }

  @SubscribeMessage('findAllNotification')
  findAll() {
    return this._notificationService.findAll();
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: number) {
    return this._notificationService.findOne(id);
  }

  @SubscribeMessage('updateNotification')
  update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this._notificationService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  @SubscribeMessage('removeNotification')
  remove(@MessageBody() id: number) {
    return this._notificationService.remove(id);
  }
}
