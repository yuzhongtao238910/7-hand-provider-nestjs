import { Injectable } from "@nestjs/common";

@Injectable()
export class UseValueService {
    constructor() {}
    log(message) {
        console.log("UseValueService: " + message + "238910")
    }
}