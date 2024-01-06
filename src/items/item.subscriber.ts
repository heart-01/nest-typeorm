import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Item } from './entities/item.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Item;
  }

  beforeInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log(`BeforeInsert`, JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log(`AfterInsert`, JSON.stringify(event.entity));
  }
}
