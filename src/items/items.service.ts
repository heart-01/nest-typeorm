import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });
    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );
    const item = new Item({
      ...createItemDto,
      comments: [],
      listing,
      tags,
    });
    await this.entityManager.save(item);
  }

  findAll() {
    return this.itemRepository.find();
  }

  async findOne(id: number) {
    // return await this.itemRepository.findOneBy({ id });
    return await this.itemRepository.findOne({
      where: { id },
      relations: {
        listing: true,
        comments: true,
        tags: true,
      },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    /*
    const item = await this.itemRepository.findOneBy({ id });
    item.public = updateItemDto.public;
    const comments = updateItemDto.comments.map(
      (createCommentDto) => new Comment(createCommentDto),
    );
    item.comments = comments;
    return await this.entityManager.save(item);
    */

    // using transaction
    await this.entityManager.transaction(async (entityManager) => {
      const item = await this.itemRepository.findOneBy({ id });
      item.public = updateItemDto.public;
      const comments = updateItemDto.comments.map(
        (createCommentDto) => new Comment(createCommentDto),
      );
      item.comments = comments;
      await entityManager.save(item);

      throw new Error();

      const tagContent = `${Math.random()}`;
      const tag = new Tag({ content: tagContent });
      await entityManager.save(tag);
    });
  }

  async remove(id: number) {
    await this.itemRepository.delete({ id });
  }
}
