import { Injectable, Inject } from "@nestjs/common"


@Injectable()
export class UseFactory {
    constructor(prefix1, @Inject("SUFFIX") private prefix2) {
        console.log("UseFactory", prefix1, prefix2)
    }
    log(message: string) {
        console.log("UseFactory:" + message + this.prefix2)
    }
}