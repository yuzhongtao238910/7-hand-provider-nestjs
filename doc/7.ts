import "reflect-metadata"
function Inject1(): ParameterDecorator {
    // target是类的本身的
    return (target: any, propertyKey: any, parameterIndex: number) => {
        console.log(target, 44, propertyKey, parameterIndex)
        setTimeout(() => {
            console.log(target === Person)
        }, 1111)
        Reflect.defineMetadata("11", 22, target)
    }
}

function Inject2(): ParameterDecorator {

    // target是类的原型
    return (target: any, propertyKey: any, parameterIndex: number) => {
        console.log(target, 111, propertyKey, parameterIndex)
        setTimeout(() => {
            console.log(target === Person.prototype)
        }, 2222)
    }
}



class Person {
    constructor(@Inject1() a: number) { }
    method(@Inject2() b: number) {

    }
}

const metadata = Reflect.getMetadata("11", Person)
console.log(metadata, "metadata")

export { }