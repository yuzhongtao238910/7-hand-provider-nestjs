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
        // 这种注入的值的需要放到前面
        // 这种是有一些数据也不需要使用一个类的
        {
            provide: "SUFFIX",
            useValue: "suffix"
        },
        // 这种写法使用的最多，但是不能传参数
        AppleService, // 这样是下面的语法糖哈
        {
            provide: LoggerService,
            useClass: LoggerService
        },
        {
            // 这个也是一种定义provider的方法
            // usevalue不需要递归处理了
            provide: "StringToken", // 这是一个token，标志、令牌，也就是provider的名字
            useValue: new UseValueService('prefix') // 可以直接提供一个值
        },
        {
            provide: "FactoryToken",
            // inject: [`prefix1`, 'prefix2'], 两个都是普通的字符串
            inject: [`prefix1`, 'SUFFIX'], // 这种情况下suffix是一个需要注入的token
            useFactory: (prefix1, prefix2) => new UseFactory(prefix1, prefix2)
        },
        
    ]
})
export class AppModule {

}