import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('redirects_report', function(table) {
    table.uuid('id').primary();
    table.uuid('redirect_id');
    table.string('ip').nullable();
    table.string('os').nullable();
    table.string('platform').nullable();
    table.string('browser').nullable();
    table.string('browser_version').notNullable();
    table.boolean('isMobile').defaultTo(false);
    table.boolean('isDesktop').defaultTo(false);
    table.boolean('isBot').defaultTo(false);
    table.boolean('isAndroid').defaultTo(false);
    table.boolean('isiPhone').defaultTo(false);
    table.boolean('isMac').defaultTo(false);
    table.boolean('isLinux').defaultTo(false);
    table.boolean('isWindows').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table
      .foreign('redirect_id')
      .references('id')
      .inTable('redirects');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('redirects_report');
}
