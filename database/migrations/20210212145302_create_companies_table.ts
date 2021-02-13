import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('companies', function(table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table
      .string('apikey')
      .notNullable()
      .unique();
    table
      .boolean('active')
      .notNullable()
      .defaultTo(true);
    table.string('phone').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('companies');
}
