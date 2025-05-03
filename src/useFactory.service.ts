import { Injectable } from "@nestjs/common"


@Injectable()
export class UseFactory {
    log(message: string) {
        console.log("UseFactory:" + message)
    }
}