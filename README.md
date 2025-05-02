[Nest] 8088  - 2025/04/08 17:41:50     LOG [NestFactory] Starting Nest application...
[Nest] 8088  - 2025/04/08 17:41:50     LOG [InstanceLoader] AppModule dependencies initialized +13ms
[Nest] 8088  - 2025/04/08 17:41:50     LOG [RoutesResolver] AppController {/}: +5ms
[Nest] 8088  - 2025/04/08 17:41:50     LOG [RouterExplorer] Mapped {/, GET} route +4ms
[Nest] 8088  - 2025/04/08 17:41:50     LOG [NestApplication] Nest application successfully started +2ms


-r 是 --require的缩写，用于执行脚本之前的预加载模块，

ts-node -r tsconfig-paths/register ./src/main.ts

ts-node 是一个用于直接运行ts代码的工具，它允许在不预先编译的情况下直接运行ts文件
-r tsconfig-paths/register 是ts-node的一个选项，用于在运行ts文件时，使用tsconfig.json中的paths配置
