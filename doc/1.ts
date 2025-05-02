
import "reflect-metadata"


function logClass(target: any) {
    console.log(target)
    Reflect.defineMetadata("name", "张三", target)
    setTimeout(() => {
        console.log("1秒后执行", Test === target)

        const metadata1 = Reflect.getOwnMetadata("name", target)
        console.log(metadata1)


        const metadata2 = Reflect.getOwnMetadata("name", target.prototype)
        console.log(metadata2)
    }, 1000)
}

@logClass
class Test {
    
    name: string
}


export {}



