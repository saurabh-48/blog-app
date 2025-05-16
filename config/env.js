/* eslint-disable */
import _loadEnv from './load_dotenv.js';

const {
  DB_PSQL_HOST, DB_PSQL_PORT, DB_PSQL_USERNAME,
  DB_PSQL_DATABASE,
  DB_PSQL_REPLICA1,
} = process.env;

const appEnv = (process.env.APP_ENV || 'development')

const defaultConfig = {
  port: (process.env.PORT || 3000),
  appName: 'sip-rocket',
  reqSession: 'req-session',
  loggingMode: 'info',
  appEnv: appEnv,
  nodeEnv: (process.env.NODE_ENV || 'development'),

  dbPgPrimary: DB_PSQL_HOST,
  pgReadReplica1: (DB_PSQL_REPLICA1 || DB_PSQL_HOST),
  DB_PSQL_PORT,
  DB_PSQL_DATABASE,
  DB_PSQL_USERNAME,
};


const appConfig = { ...defaultConfig };

export default appConfig;
/* eslint-enable */
