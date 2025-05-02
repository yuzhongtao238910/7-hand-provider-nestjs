// 为了取req上面的user的属性，这次是自定义了一个装饰器

import { createParamDecorator } from "@nestjs/common"

// 创建了一个自定义的装饰器
export const User = createParamDecorator(
    (data, context) => {
        const req = context.switchToHttp().getRequest()

        return data ? req.user[data] : req.user 
    }
)