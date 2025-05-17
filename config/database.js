import config from './env.js';

// using read replica setup. Taken reference from below
// https://sequelize.org/docs/v6/other-topics/read-replication/
const dbConfig = {
  development: {
    port: config.DB_PSQL_PORT,
    database: config.DB_PSQL_DATABASE,
    username: config.DB_PSQL_USERNAME,
    password: config.DB_PSQL_PASSWORD,
    dialect: 'postgres',
    replication: {
      read: [
        { host: config.pgReadReplica1 },
      ],
      write: { host: config.dbPgPrimary },
    },
  },
};

export default dbConfig;
