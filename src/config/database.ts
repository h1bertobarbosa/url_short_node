import Knex from 'knex';
import knexConfig from '@src/config/knex.config';
import { attachPaginate } from 'knex-paginate';

const knex = Knex(knexConfig);
attachPaginate();
export default knex;
