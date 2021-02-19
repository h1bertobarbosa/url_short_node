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

/*
{
  isYaBrowser: false,
  isAuthoritative: true,
  isMobile: false,
  isMobileNative: false,
  isTablet: false,
  isiPad: false,
  isiPod: false,
  isiPhone: false,
  isiPhoneNative: false,
  isAndroid: false,
  isAndroidNative: false,
  isBlackberry: false,
  isOpera: false,
  isIE: false,
  isEdge: false,
  isIECompatibilityMode: false,
  isSafari: false,
  isFirefox: false,
  isWebkit: false,
  isChrome: true,
  isKonqueror: false,
  isOmniWeb: false,
  isSeaMonkey: false,
  isFlock: false,
  isAmaya: false,
  isPhantomJS: false,
  isEpiphany: false,
  isDesktop: true,
  isWindows: false,
  isLinux: true,
  isLinux64: true,
  isMac: false,
  isChromeOS: false,
  isBada: false,
  isSamsung: false,
  isRaspberry: false,
  isBot: false,
  isCurl: false,
  isAndroidTablet: false,
  isWinJs: false,
  isKindleFire: false,
  isSilk: false,
  isCaptive: false,
  isSmartTV: false,
  isUC: false,
  isFacebook: false,
  isAlamoFire: false,
  isElectron: false,
  silkAccelerated: false,
  browser: 'Chrome',
  version: '88.0.4324.152',
  os: 'Linux 64',
  platform: 'Linux',
  geoIp: {},
  source: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Safari/537.36',
  isWechat: false
} */
