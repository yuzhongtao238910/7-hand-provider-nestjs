import { Module } from "@nestjs/common";
import { AppController } from "./app.controller"
import { UserController } from "./user.controller"
import { LoggerService } from "./logger.service"
import { UseValueService } from "./useValue.service"
import { UseFactory } from "./useFactory.service"
import { AppleService } from "./apple.service"


@Module({
    controllers: [ AppController, UserController ],
    providers: [ 
        AppleService, // 这样是下面的语法糖哈
        {
            provide: LoggerService,
            useClass: LoggerService
        },
        {
            // 这个也是一种定义provider的方法
            provide: "StringToken", // 这是一个token，标志、令牌，也就是provider的名字
            useValue: new UseValueService() // 可以直接提供一个值
        },
        {
            provide: "FactoryToken",
            useFactory: () => new UseFactory()
        }
    ]
})
export class AppModule {

}