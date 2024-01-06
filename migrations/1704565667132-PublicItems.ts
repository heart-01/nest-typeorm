import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItems1704565667132 implements MigrationInterface {
  private readonly logger = new Logger(PublicItems1704565667132.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Migration up');
    await queryRunner.query('UPDATE item SET public = 1');
  }

  public async down(): Promise<void> {
    this.logger.log('Migration down');
  }
}
