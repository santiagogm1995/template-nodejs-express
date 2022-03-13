import { NextFunction, Request, Response } from "express";
import winston, { Logger, transports } from "winston";
import { HttpLog } from "./httpLog";

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
});

const format = winston.format.combine(
  winston.format.json(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true })
);

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const Logger = winston.createLogger({
  level: level(),
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  format,
  transports: [new transports.Console()],
});

export class CustomLogger {
  public static error(message: string): void {
    Logger.error(message);
  }

  public static warn(message: string): void {
    Logger.warn(message);
  }

  public static info(message: string): void {
    Logger.info(message);
  }

  public static http(req: Request, res: Response, next: NextFunction): void {
    const httpLog = new HttpLog(req.ip, req.method, req.body);
    Logger.http(httpLog);
    next();
  }

  public static debug(message: string): void {
    Logger.debug(message);
  }
}
