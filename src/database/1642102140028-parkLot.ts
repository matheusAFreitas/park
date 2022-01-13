import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class park1642101208458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'park_lot',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'vehicle_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'size',
            type: 'int',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('park');
  }
}
