import { createLogger, format, transports } from 'winston';

import cls from 'cls-hooked'
import config from '../config/env.js';

const { combine, errors, timestamp, label, json, prettyPrint } = format;
const SERVICE_LABEL = config.appName;

// add logging to console as well for fluentd in kubernetes
// add logging to console as well for local development
const consoleTransport = new transports.Console({
  format: config.nodeEnv === 'production' ? '' : prettyPrint(),
});

const stringifyMessage = format((info) => {
  const { message } = info;

  if (typeof message !== 'string') {
    try {
      info.message = JSON.stringify(message);
    } catch(error) {
      console.log("Unable to stringify message object: ", message);
      console.log("Error raised in stringifyMessage: ", error);
    }
  }

  return info;
})();


const logger = createLogger({
  level: 'info', // log only if level less than or equal to this level
  format: combine(
    stringifyMessage,
    errors({ stack: true }),
    label({ label: SERVICE_LABEL }),
    timestamp(),
    json(),
  ),
  defaultMeta: {},
  transports: [
    consoleTransport, // will be used on info level
  ],
});

class LogFactory {
  static logger = logger;

  static setLogger(logger) {
    this.logger = logger;
  }

  static getLogger(klass = null) {
    const reqContext = cls.getNamespace(`${SERVICE_LABEL}-req-context`)
    if(!reqContext) {
      return logger;
    }
    const reqContextValue = reqContext.get(config.reqSession)
    if(!reqContextValue) {
      return logger;
    }
    const baseLogger = this.logger || logger;
    return klass ? baseLogger.child({...reqContextValue, class_name: klass }) : baseLogger.child(reqContextValue);
  }

  static getSequelizeLogger(sequelize, className = 'cherry-pro-sequelize') {
    sequelize.options.logging = (sql, timingMs) => {
      if (config.appEnv === 'development') {
        this.getLogger(className).info(`${sql} - [Execution time: ${timingMs}ms]`);
        return;
      }

      this.getLogger(className).info(sql);
    };
  }
}

export { LogFactory };
