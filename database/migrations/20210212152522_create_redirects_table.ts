import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('redirects', function(table) {
    table.uuid('id').primary();
    table.uuid('company_id');
    table
      .foreign('company_id')
      .references('id')
      .inTable('companies');
    table.string('original_url').notNullable();
    table
      .string('url_code')
      .unique()
      .notNullable();
    table
      .string('external_id')
      .nullable()
      .index();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('redirects');
}
