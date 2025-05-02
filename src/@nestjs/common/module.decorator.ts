import "reflect-metadata"

interface ModuleMetadata {
    controllers: Function[]
}

// 定义模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
    return function (target: Function) {
        // TODO  定义元数据
        // 给模块类添加元数据
        // target === AppModule
        Reflect.defineMetadata("controllers", metadata.controllers, target)
    }
}

