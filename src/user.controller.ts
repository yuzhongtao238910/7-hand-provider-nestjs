import { Controller, 
    Get, Post, Redirect, HttpCode, Header,
    Request, Req, Query, Headers, Session, Ip, Param, Body, Res, Response, Next } from "@nestjs/common";
import { Request as ExpressRequest, Response as ExpressResponse, 
    NextFunction  } from "express"

import { User } from "./user.decorator"




// Req 和 Request是一模一样的
@Controller("users")
export class UserController {
    // 
    @Get("req")
    handleRequest(@Request() request: ExpressRequest, age: number, @Req() req: ExpressRequest) {
        // 如果有一个参数没有配置装饰器的话，像之前这样写的就会出错了
        // 但是这种情况下一般不会出现，这种情况下age都是空的
        // 
        console.log(req.method)
        console.log(request.method)
        console.log(req.url)
        console.log(request.url)
        return "req-users"
    }
    // 获取查询参数 query
    @Get("query")
    handleQuery(@Query() query: any, @Query("id") id: any) {
        console.log(query, id, "+++")
        return "query"
    }
    

    // 获取请求头的参数
    @Get("headers")
    handleHeaders(@Headers() headers: any, @Headers("accept") accept: any) {
        console.log(headers, accept, "+++")
        return "headers"
    }


    // 处理会话
    @Get("session")
    handleSession(@Session() session: any, @Session("pageView") pageView: any) {
        console.log(session, pageView, "+++")
        if (session.pageView) {
            session.pageView++
        } else {
            session.pageView=1
        }
        if (!session.userinfo) {
            session.userinfo = {
                name: "1111"
            }
        } else {
            console.log(session)
        }
        
        return "session"
    }


    @Get("ip")
    handleUserIp(@Ip() ip: string) {
        console.log(ip)
        return "ip--config" + ip
    }


    @Get(":username/info/:age")
    handleParamsRequest(@Param() params: any, @Param("username") username: string, @Param("age") age: string) {
        console.log(params)
        console.log(username)
        console.log(age)
        return username + age + "info"
    }


    // 支持通配符  可以支持路由的通配符号，例如*
    // @Get()

    @Get("star/ab*de")
    handleWildCard() {
        return "handleWildCard"
    }

    @Post("create")
    createUser(@Body() createUserDto: any, @Body("username") username: string) {
        console.log(createUserDto, "createUserDto")
        console.log(username, "username")
        return "user created"
    }


    /**
     * 当我们在方法之中来注入@Res 或者是 @Response的时候，就会将Nest至于该处理程序的特定库模式，
     * 我们将负责管理相响应，在这种情况下，我们必须通过response对象进行调用例如 res.json 或者是
     * res.send 来发出响应，否则http服务器将会被挂起
     */
    @Get("response")
    response(@Res() res: ExpressResponse, @Response() response: ExpressResponse) {
        console.log(res, "res")
        console.log(response, "response")
        console.log(res === response)

        // 都没有调用的话程序就会挂起了
        res.send("238910")

        // res.json()
        return "response"
    }



    // 如果只是在这块处理一下headers等简单的东西，但还是希望响应给nestjs去做
    // 就需要使用 { passthrough: true }
    // passthrough 路过
    @Get("passthrough")
    passthrough(@Res({passthrough: true}) res: ExpressResponse, @Response() response: ExpressResponse) {
        res.setHeader("key", "value")
        // 还是想返回一个值，让nest值帮我去处理响应
        return "response"
    }


    // 如果不调用next还是会卡住和Response一样
    @Get("next")
    next(@Next() next) {
        next()
        // Cannot GET /users/next  此时返回这个是正确的，是由express来处理的
        // return "next"
    }

    @Get("redirect")
    @Redirect("/users/passthrough", 301)
    handleRedirect() {
        // 此时这个里面就不需要写什么了
    }

    // 有时候我们需要动态的确定重定向的url
    @Get("redirect1")
    handleRedirect1(@Query("version") version: string) {
        // 这个是动态的路径了
        // http://localhost:8080/users/redirect1?version=v5
        return {
            url: `https://doc.nestjs.com/${version}`,
            statusCode: 302
        }
    }

    // 状态码，在nestjs之中，响应的状态码默认是200，但是post请求的状态码是201，我们可以使用@HttpCode来修改状态码的
    @Post("code")
    @HttpCode(200) // 强制让服务器返回的状态码是200哈
    testStatusCode(@Body() createUserDto: any, @Body("username") username: string) {
        console.log(createUserDto, "createUserDto")
        console.log(username, "username")
        return "code created"
    }

    // 状态码，在nestjs之中，响应的状态码默认是200，但是post请求的状态码是201，我们可以使用@HttpCode来修改状态码的
    @Get("header")
    @HttpCode(200) // 强制让服务器返回的状态码是200哈
    @Header("Cache-Control", "none") // 通过Header来设置响应头，发送一个响应头
    @Header("key1", "value1") 
    @Header("key2", "value2") 
    setHeader() {
        return "code created"
    }


    @Get("customer-decorator")
    customerDecorator(@User() user, @User("role") role) {
        console.log(user, "user")
        console.log(role, "role")
        return user
    }
}

/*

在使用nestjs的时候，一般来说一个实体会有2个数据类型，一个是dto，一个interface

dto：数据传输对象，客户端向服务器提交的数据对象，当用户注册的时候 {用户名，密码}

然后服务器端一般会获取此dto，然后保存到数据库之中，保存的时候可能会加入一些其他的值：时间戳，密码加密，

还会过滤一些值：确认密码就会被过滤

数据库之中保存的类型一般是interface的

userDto 用户名，密码，确认密码

userInterface 用户名，密码，时间戳 .......

在nestjs之中，dto一般是一个对象，因为ts编译之后接口会消失，接口编译之后就不在了，而且类还可以做一些参数的校验

*/