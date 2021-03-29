/**
 * interface 类型契约
 *   可选
 *   只读
 *   函数类型
 *   构造函数类型
 *   函数传参：默认参数、不定参数、可选参数、剩余参数
 *   箭头函数
 *   函数重载
 *   属性检查
 *   类型断言：指定为某种类型
 *   索引签名：动态属性
 *   可索引类型
 *   继承接口
 */

interface IUser1 {
  name: string
  // 可选
  age?: number
  // 只读
  readonly isMale: boolean
}
const getUserName = (user: IUser1) => user.name
const getUserName1 = (user: IUser1): number => {
  // 不能更改只读属性的值
  // ❌ Cannot assign to 'isMale' because it is a read-only property.ts(2540)
  // user.isMale = false
  return user.age
}

/**
 * 函数类型
 *   指定函数名
 *   不指定函数名
 *   构造函数
 */
// 定义包含函数形式 key 的对象，并指定其函数名
interface Func1 {
  say: (words: string) => string
}
const func1 = (param: Func1) => {
  param.say('qaz')
}
// 定义函数整体类型：传参
interface Func2 {
  (words: string): string
}
const func2: Func2 = words => {
  return words
}
// 实参可以比接口定义的参数少，即时定义的不是可选参数
interface Func3 {
  (a: number, b: number): number
}
const func3: Func3 = a => a

/**
 * 属性检查，针对可选类型的判断
 */
interface Config {
  width?: number
  // 字符串索引签名
  // [propName: string]: any
}
function CalculateAreas(config: Config): { area: number } {
  let square = 100
  // 属性检查
  if (config.width) {
    square = config.width * config.width
  }
  return { area: square }
}
const mySquare = CalculateAreas({ width: 5 })
// 写错了 key
// const mySquare1 = CalculateAreas({ widdth: 5 })
/* 类型断言 */
const mySquare2 = CalculateAreas({ widdth: 5 } as Config)
// 对象字面量类型，跳过类型检查
let options: any = { widdth: 5 }
let mySquare4 = CalculateAreas(options)
// 多重类型断言
const mySquare3 = CalculateAreas((123 as any) as Config)

/**
 * 可索引类型，interface 嵌套
 */
interface Phone {
  [name: string]: string
}
interface IUser2 {
  name: string
  age?: number
  readonly isMale: boolean
  say: () => string
  phone: Phone
}

/**
 * 继承接口
 */
// 原样继承
interface VIPUser1 extends IUser2 {}
// 新增属性/方法
interface VIPUser2 extends IUser2 {
  // 函数名、形参类型、返回值类型
  broadcast: () => void
}
// 多重继承
interface SupperUser {
  id: number
}
interface VIPUser3 extends User, SupperUser {
  broadcast: () => void
}

export {}
