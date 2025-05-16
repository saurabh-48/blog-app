import config from '../config/env.js'
import { LogFactory } from '../lib/logger.js';
import server from '../server.js';

const port = config.port;
const nodeEnv = config.nodeEnv;

server.listen(port, () => {
    LogFactory.getLogger().info(`Server running in ${nodeEnv} environment on port: ${port}`);
})
