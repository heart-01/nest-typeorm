import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  public: boolean;
}
