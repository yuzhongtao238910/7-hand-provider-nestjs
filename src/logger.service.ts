import { Injectable } from "@nestjs/common"


@Injectable()
export class LoggerService {
    log(message) {
        console.log("LoggerService:" + message + "----")
        return "log"
    }
}