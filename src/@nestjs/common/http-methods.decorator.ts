import "reflect-metadata"


export function Get(path: string = ""): MethodDecorator {
    /**
     * target 类的原型 AppController.prototype
     * propertyKey 方法名 hello
     * descriptor 方法的描述对象 {value: hello, writable: true, enumerable: true, configurable: true}
     */
    return function (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor) {
        // TODO
        // 定义路由的
        // 给descriptor.value ,也就是index函数来添加元数据 path
        Reflect.defineMetadata("path", path, descriptor.value)
        // descriptor.value.path = path  等价于这个写法，但是这样写就是会污染原先的数据
        // 给descriptor.value ,也就是index函数来添加元数据 method
        Reflect.defineMetadata("method", "GET", descriptor.value)
        // descriptor.value.method = "GET" 等价于这个写法，但是这样写就是会污染原先的数据
    }
}



export function Post(path: string = ""): MethodDecorator {
    /**
     * target 类的原型 AppController.prototype
     * propertyKey 方法名 hello
     * descriptor 方法的描述对象 {value: hello, writable: true, enumerable: true, configurable: true}
     */
    return function (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor) {
        // TODO
        // 定义路由的
        // 给descriptor.value ,也就是index函数来添加元数据 path
        Reflect.defineMetadata("path", path, descriptor.value)
        // descriptor.value.path = path  等价于这个写法，但是这样写就是会污染原先的数据
        // 给descriptor.value ,也就是index函数来添加元数据 method
        Reflect.defineMetadata("method", "POST", descriptor.value)
        // descriptor.value.method = "GET" 等价于这个写法，但是这样写就是会污染原先的数据
    }
}


// 302临时重定向
// 301永久重定向
export function Redirect(url: string = "", statusCode: number = 302): MethodDecorator {
    /**
     * target 类的原型 AppController.prototype
     * propertyKey 方法名 hello
     * descriptor 方法的描述对象 {value: hello, writable: true, enumerable: true, configurable: true}
     */
    return function (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor) {
        // TODO
        // 定义路由的
        // 给descriptor.value ,也就是index函数来添加元数据 path
        Reflect.defineMetadata("redirectUrl", url, descriptor.value)
        // descriptor.value.path = path  等价于这个写法，但是这样写就是会污染原先的数据
        // 给descriptor.value ,也就是index函数来添加元数据 method
        Reflect.defineMetadata("redirectStatusCode", statusCode, descriptor.value)
        // descriptor.value.method = "GET" 等价于这个写法，但是这样写就是会污染原先的数据
    }
}

// HttpCode
export function HttpCode(statusCode: number = 200): MethodDecorator {
    /**
     * target 类的原型 AppController.prototype
     * propertyKey 方法名 hello
     * descriptor 方法的描述对象 {value: hello, writable: true, enumerable: true, configurable: true}
     */
    return function (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor) {
        // TODO
        // 定义路由的
        // 给descriptor.value ,也就是index函数来添加元数据 path
        // Reflect.defineMetadata("redirectUrl", url, descriptor.value)
        // descriptor.value.path = path  等价于这个写法，但是这样写就是会污染原先的数据
        // 给descriptor.value ,也就是index函数来添加元数据 method
        Reflect.defineMetadata("statusCode", statusCode, descriptor.value)
        // descriptor.value.method = "GET" 等价于这个写法，但是这样写就是会污染原先的数据
    }
}

// Header
export function Header(name: string, value: string): MethodDecorator {
    /**
     * target 类的原型 AppController.prototype
     * propertyKey 方法名 hello
     * descriptor 方法的描述对象 {value: hello, writable: true, enumerable: true, configurable: true}
     */
    return function (target: Object, propertyKey: string | Symbol, descriptor: PropertyDescriptor) {
        
        // Reflect.defineMetadata("statusCode", statusCode, descriptor.value)
        const existingHeaders = Reflect.getMetadata("headers", descriptor.value) || []
        existingHeaders.push({name, value})
        Reflect.defineMetadata("headers", existingHeaders, descriptor.value)
    }
}