import { IsBoolean, IsString } from 'class-validator';

import { Column, Entity } from 'typeorm';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { Base } from '../../shared/base.entity';

@Entity({ name: 'message', synchronize: true })
export class Message extends Base {
  @Column({ name: 'conversation_id' })
  conversationId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id', referencedColumnName: 'id' })
  conversation: Conversation;

  @Column({ name: 'sender_id', type: 'uuid' })
  sender_id: string;

  @Column({ name: 'receiver_id', type: 'uuid' })
  receiver_id: string;

  @Column({ name: 'content' })
  @IsString()
  content: string;

  @Column({ name: 'is_seen' })
  @IsBoolean()
  isSeen: boolean;
}
