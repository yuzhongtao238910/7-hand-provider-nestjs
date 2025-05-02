import clc from "cli-color"
class Logger {
    private static lastLogTime = Date.now()
    static log(message: string, context: string = "") {
        // 第一步，或者当前的时间戳
        const timestamp = new Date().toLocaleString()
        // 第2步，获取当前的进程ID
        const pid = process.pid


        const curretnTime = Date.now()
        const timeDiff = curretnTime - Logger.lastLogTime
        
        // 第三步，打印日志
        console.log(`[${clc.green('Nest')}]  ${clc.green(pid)} - ${clc.yellow(timestamp)}    ${clc.green('LOG1')} [${clc.yellow(context)}] ${clc.green(message)} +${timeDiff}ms`)
        
        Logger.lastLogTime = curretnTime
    }
}

export { Logger }
