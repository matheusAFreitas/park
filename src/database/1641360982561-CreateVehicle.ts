import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVehicle1641360982561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'marca',
            type: 'varchar',
          },
          {
            name: 'modelo',
            type: 'varchar',
          },
          {
            name: 'cor',
            type: 'varchar',
          },
          {
            name: 'placa',
            type: 'varchar',
          },
          {
            name: 'tipo',
            type: 'varchar',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicles');
  }
}
