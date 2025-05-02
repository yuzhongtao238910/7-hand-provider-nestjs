import { Module } from "@nestjs/common";
import { AppController } from "./app.controller"
import { UserController } from "./user.controller"
import {loggerService } from "./logger.service"


@Module({
    controllers: [AppController, UserController]
})
export class AppModule {

}