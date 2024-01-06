import { ApiProperty } from '@nestjs/swagger';
import { CreateListingDto } from './create-listing.dto';
import { CreateTagDto } from './create-tag.dto';

export class CreateItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  public: boolean;

  @ApiProperty()
  listing: CreateListingDto;

  @ApiProperty()
  tags: CreateTagDto[];
}
