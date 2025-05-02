import { Controller, Get } from "@nestjs/common";


@Controller("")
export class AppController {
    @Get("hello")
    hello(...args: any[]) {
        console.log(args)
        return "hello"
    }

    @Get("apple")
    apple() {
        return "apple"
    }
}