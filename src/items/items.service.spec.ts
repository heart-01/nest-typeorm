import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { EntityManager, Repository } from 'typeorm';

describe('ItemsService', () => {
  let service: ItemsService;
  let itemsRepository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'itemOne',
                public: true,
                created: '2024-01-06T10:46:32.667Z',
                updated: '2024-01-06T10:46:32.667Z',
                listing: {
                  id: 3,
                  description: 'listingThree',
                  rating: 0,
                  created: '2024-01-06T10:46:32.650Z',
                  updated: '2024-01-06T10:46:32.650Z',
                },
                comments: [
                  {
                    id: 1,
                    content: 'commentOne',
                  },
                ],
                tags: [
                  {
                    id: 1,
                    content: 'tagOne',
                  },
                  {
                    id: 2,
                    content: 'tagTwo',
                  },
                  {
                    id: 3,
                    content: 'tagThree',
                  },
                ],
              },
            ]),
          },
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    itemsRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findAll', async () => {
    await service.findAll();
    expect(itemsRepository.find).toHaveBeenCalled();
  });

  test('findOne', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).not.toBeNull();
    expect(itemsRepository.findOne).toHaveBeenCalled();
  });
});
