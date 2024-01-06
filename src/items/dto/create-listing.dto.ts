import { ApiProperty } from "@nestjs/swagger";

export class CreateListingDto {
  @ApiProperty()
  description: string;
}
