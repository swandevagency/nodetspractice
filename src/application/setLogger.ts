import winston from 'winston'

// Define your severity levels. 
// With them, You can create log files, 
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  return process.env.NODE_ENV === "production" ? 'http' : 'debug'
}

// Define different colors for each level.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

// Define which transports the logger must use to print out messages.
let transports: any;

if (process.env.NODE_ENV === 'production') {
  transports = [
    new winston.transports.Console(),
  
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    new winston.transports.File({ filename: 'logs/all.log' }),
  ]
}else {
  transports = [
    new winston.transports.Console(),
  ]
}

// Create the logger instance that has to be exported 
// and used to log messages.
const Logger = () => {
    const logger =winston.createLogger({
        level: level(),
        levels,
        format,
        transports,
    });
    global.logger = logger;
}

export default Logger