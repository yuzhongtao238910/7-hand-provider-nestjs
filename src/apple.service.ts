import { Injectable } from "@nestjs/common"


@Injectable()
export class AppleService {
    constructor() {
        console.log("11111")
    }
    log(message: string) {
        console.log("AppleService:" + message)
    }
}