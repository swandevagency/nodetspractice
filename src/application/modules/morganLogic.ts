import morgan, { StreamOptions } from "morgan";

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

export default morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);
