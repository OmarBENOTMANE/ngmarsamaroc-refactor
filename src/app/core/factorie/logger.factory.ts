import {environment} from "../../../environments/environment";
import {LoggerTypes} from "./logger.type";
import {ConsoleLoggerService} from "../service/loggine/console-logger.service";

export let loggerFactory = () => {
  switch (environment.apiConfig.loggerService){
    case LoggerTypes.CONSOLE:
      return  new ConsoleLoggerService();
    default:
      return new ConsoleLoggerService();
  }
}
