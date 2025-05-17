import { LogFactory } from '../lib/logger.js';
import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';
import env from '../config/env.js';
const options = dbConfig[env.nodeEnv];

LogFactory.getLogger().info(options);
options.minifyAliases = true;

// Added connection pool for postgre database
options.pool = {
  max: 20,
  min: 0,
  acquire: 60000,
  idle: 10000,
};

// Override the logging function to use our own logger
options.logging = (msg) => {
  LogFactory.getLogger().info(msg);
};

if (env.appEnv === 'development') {
  options.benchmark = true;
}

const sequelize = new Sequelize(options);
LogFactory.getSequelizeLogger(sequelize);

sequelize.authenticate().then(() => {
  LogFactory.getLogger().info('Database Connection has been established successfully.');
}).catch((error) => {
  LogFactory.getLogger().error('Unable to connect to the MFInhouse database: ', error);
});

export default sequelize;
