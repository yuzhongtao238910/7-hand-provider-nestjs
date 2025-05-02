let a = 1
let b = 2
let d = 0


// 0 '' null undefined false 都是false


// ?? 只会认为 null undefined 是false

let c = a ?? b

let e = d ?? b

let f = false ?? b

let g = undefined ?? b

let h = null ?? b

console.log(c)
console.log(e)
console.log(f)
console.log(g)
console.log(h)
