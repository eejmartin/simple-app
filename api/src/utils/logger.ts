import {
  createLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';

// log level
const level = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info: any) => {
  if (info.private) {
    return false;
  }
  return info;
});

// define the custom settings for each transport, e.g., file, console, elasticsearch
const loggerOptions = {
  level: level,
  exitOnError: false,
  format: format.combine(
    ignorePrivate(),
    format.prettyPrint(),
    format.colorize(),
  ),

  transports: [
    new transports.Console({
      level: level,
      silent: false,
    }),
  ],
};

// instantiate a new Winston createLogger with the settings defined above
const logger: Logger = createLogger(loggerOptions);

// create a stream object with a 'write' function that will be used by `morgan`
const loggerStream = {
  write: (message: string) => {
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export { logger, loggerStream };
