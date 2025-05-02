
import { Logger } from "./logger";
import { NestApplication } from "./NestApplication";

export class NestFactory {

    // 创建一个nestjs实例
    static async create(module: any) {
        // 启动Nestjs
        Logger.log("Starting Nest application...", "NestFactory")
        // 创建一个Nest应用实例
        const app = new NestApplication(module)
        // 返回这个实例
        return app
    }
}



