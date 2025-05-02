import "reflect-metadata"

import { Logger } from "./logger";
import express, { Express, Request as ExpressRequest, Response as ExpressResponse, 
    NextFunction  } from "express"
import path from "path"
export class NestApplication {
    // 在内部私有化一个express实例
    private readonly app: Express = express()

    use(middleware) {
        this.app.use(middleware)
    }

    // 启动Nestjs
    constructor(protected readonly module) {
        this.app.use(express.json()) // 用来将json格式的请求体放到body上面
        this.app.use(express.urlencoded({extended: true})) // 把form表单格式的请求体放到body上面
        // 启动Nestjs
        // Logger.log("Starting Nest application...", "NestApplication")


        // 此时会可能会自定义一些属性，每次在req里面取user很麻烦，我们可以自定义一些装饰器
        this.app.use((req, res, next) => {
            req.user = {
                name: "admin",
                role: "admin"
            }
            next()
        })
    }

    async init() {
        // 取出模块之中的所有的控制器，然后做好路由配置
        // 初始化Nestjs
        const controllers = Reflect.getOwnMetadata("controllers", this.module) || []
        Logger.log(`AppModule dependencies initialized`, "InstanceLoader")
        // 遍历controllers
        for (const Controller of controllers) {

            // 创建控制器实例
            const controller = new Controller()
            // 获取控制器类的路径前缀
            const prefix = Reflect.getOwnMetadata("prefix", Controller) || ''
            // 开始路由解析
            Logger.log(`${Controller.name} ${prefix}`, "RoutesResolver")

            const controllerPrototype = Reflect.getPrototypeOf(controller)

            for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
                // console.log(methodName)
                const method = controllerPrototype[methodName]
                // 获取此函数上绑定的方法名字的元数据
                const httpMethod = Reflect.getMetadata("method", method)
                // 获取此函数上绑定的路径的元数据
                const pathMetaData = Reflect.getMetadata("path", method)

                // 获取重定向的地址
                const redirectUrl = Reflect.getMetadata("redirectUrl", method)
                // 获取重定向的状态码
                const redirectStatusCode = Reflect.getMetadata("redirectStatusCode", method)

                // 获取状态码
                const statusCode = Reflect.getMetadata("statusCode", method)

                // 获取响应头
                const headers = Reflect.getMetadata("headers", method) ?? []

                // 如果方法名字不存在，那么就不处理了
                if (!httpMethod) {
                    continue
                }
                const routePath = path.posix.join("/", prefix, pathMetaData)
                // 配置路由，当客户端以httpMethod请求的时候会有对应的函数来进行处理
                this.app[httpMethod.toLowerCase()](routePath, (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
                    const args = this.resolveParams(controller, method, methodName, req, res, next)
                    // 执行路由处理函数，获取返回值
                    const result = method.call(controller, ...args)

                    if (result?.url) {
                        return res.redirect(res?.statusCode || 302, result?.url)
                    }

                    // 判断如果需要重定向，就直接重定向到指定的redirectUrl里面去
                    if (redirectUrl) {
                        return res.redirect(redirectStatusCode || 302, redirectUrl)
                    }



                    // 状态码，在nestjs之中，响应的状态码默认是200，但是post请求的状态码是201，我们可以使用@HttpCode来修改状态码的
                    // 201的意思就是实体创建成功哈
                    if (statusCode) {
                        res.statusCode = statusCode
                    } else if (httpMethod === "POST") {
                        res.statusCode = 201
                    }

                    

                    // 判断controller的methodName方法里面是否有使用Response或者Res参数装饰器，如果用了任何一个，就不在这里发送响应
                    // 有方法自己处理

                    const responseMeta = this.getResponseMetadata(controller, methodName)
                    // 判读是否有注入res或者是response装饰器
                    // 或者是注入了，但是传递了passthrough参数，都会由nestjs来返回相应
                    if (!responseMeta || responseMeta?.data?.passthrough) {

                        // 设置响应头
                        headers?.forEach(header => {
                            res.setHeader(header.name, header.value)
                        })

                        // 把返回值序列化发回给客户端
                        res.send(result)
                    }
                    
                })
                Logger.log(`Mapped {${routePath}, ${httpMethod}}`, "RoutesResolver")
            }
            Logger.log(` Nest application successfully started`, "NestApplication")
        }
    }

    resolveParams(target: any, method: any, methodName: any, req: ExpressRequest, res: ExpressResponse, next: NextFunction) {

        // const existingParameters = Reflect.getMetadata("params", Reflect.getPrototypeOf(target), methodName) || []


        const existingParameters = Reflect.getMetadata("params", Reflect.getPrototypeOf(target), methodName) ?? []

        let temp = existingParameters
        if (existingParameters && existingParameters.length) {
            // temp = existingParameters.sort((a, b) => a.parameterIndex - b.parameterIndex)
        }
        

        return temp.map((item, index) => {
            const {key, data, factory} = item
            const context = { // 因为nestjs不但支持http，还支持graphql，rpc等等其他的方式哈
                // 这块是为了兼容处理哈
                switchToHttp: () => {
                    return {
                        getRequest: ()=> req,
                        getReponse: ()=> res,
                        getNext: ()=> next
                    }
                }
            }
            switch (key) {
                case "Req":
                case "Request":
                    return req
                case "Res":
                case "Response":
                    return res
                case "Query":
                    return data ? req.query[data] : req.query
                case "Headers":
                    return data ? req.headers[data] : req.headers
                case "Session":
                    return data ? req.session[data] : req.session
                case "Ip":
                    return req.ip
                case "Param":
                    return data ? req.params[data] : req.params
                case "Body":
                    return data ? req.body[data] : req.body
                case "Next":
                    return next
                case "DecoratorFactory":
                    console.log(data, "162", data)
                    return factory(data, context)
                    // return req.user
                default:
                    return null
            }
        })
        // .filter(item => item)
    }


    // 启动app服务器
    async listen(port: number) {
        await this.init()
        // 调用express实例的listen方法启动一个express的app服务器，监听port端口
        this.app.listen(port, () => {
            // 启动成功后，打印日志
            Logger.log(`Application is running on: http://localhost:${port}`, "NestApplication")
        })
    }


    getResponseMetadata(controller, methodName) {
        // console.log(methodName, "methodName")
        const metaData =Reflect.getMetadata("params", Reflect.getPrototypeOf(controller), methodName) || []
        // console.log(metaData,"metaData")

        const metaData1 =Reflect.getMetadata("params", controller, methodName) || []
        // console.log(metaData1, "metaData1")

        // console.log(Reflect.getOwnMetadata("params", controller, methodName), "own")
        return metaData.filter(Boolean).find(item => item.key === 'Res' || item.key === 'Response' || item.key === "Next")
    }
}

