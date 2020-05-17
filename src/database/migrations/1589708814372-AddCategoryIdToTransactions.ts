import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCategoryIdToTransactions1589708814372
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        type: 'uuid',
        isNullable: true,
        name: 'category_id',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        name: 'TransactionCaregory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionCaregory');
    await queryRunner.dropColumn('transactions', 'category_id');
  }
}
