import { Controller, Get, Inject } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { UseValueService } from "./useValue.service";
import { UseFactory } from "./useFactory.service";
import { AppleService } from "./apple.service";
// import {  } from "@nestjs/common";

@Controller("")
export class AppController {

    // // [empty, 'StringToken']
    constructor(
        // 如果我们还想要来注入一个LoggerService只是属于不同实例的话
        // 此时是有点困难的，因为nestjs之中默认是单例的，此时我们就可以使用
        //  @Inject("StringToken")这种方式，就是使用不同的方式来注入
        private appleService: AppleService,
        private loggerService: LoggerService,
        @Inject("StringToken") private useValueService: UseValueService,
        // private Inject("")
        @Inject("FactoryToken") private useFactory: UseFactory
    ) {}

    @Get("hello")
    hello(...args: any[]) {
        // console.log(args)
        console.log("start")
        this.appleService.log("appleService")
        this.loggerService.log("loggerService")
        this.useValueService.log("useValueService")
        this.useFactory.log("useFactory")
        console.log("end")
        return "hello"
    }

    @Get("apple")
    apple() {
        return "apple"
    }
}