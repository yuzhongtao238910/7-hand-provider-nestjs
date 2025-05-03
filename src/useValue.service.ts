import { Injectable } from "@nestjs/common";

@Injectable()
export class UseValueService {
    constructor(prefix: string) {
        console.log("UseValueService", prefix)
    }
    log(message) {
        console.log("UseValueService: " + message + "238910")
    }
}