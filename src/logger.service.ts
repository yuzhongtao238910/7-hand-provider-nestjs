import { Injectable, Inject } from "@nestjs/common"


@Injectable()
export class LoggerService {
    constructor(@Inject("SUFFIX") private suffix: string) {
        console.log(this.suffix, "--LoggerService--", suffix)
        console.log("2222")
    }
    log(message) {
        console.log("LoggerService:" + message + "----")
        return "log"
    }
}