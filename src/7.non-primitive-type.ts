/**
 * 复合类型，如对象、函数等 6 种基本类型之外的类型
 */

/**
 * 1. Object
 *   泛指：普通对象、数组、枚举、元祖等
 */
const obj1: object = { w: 1 }
const obj2: { [key: string]: number } = { key: 123 }
const obj3: { [key: number]: string } = { 123: 'value' }
let obj4: object
obj4 = {}
obj4 = [1]
obj4 = [1, 'hello']

/**
 * 2. Array
 *   范型
 *   交叉类型
 *   联合类型
 */
const arr1: Array<number> = [1, 2, 3]
const arr3: Array<{ [key: string]: number }> = [{ w: 1 }, { w: 2 }]
const arr2: string[] = ['st1', 'st2']
const arr4: { [key: number]: string }[] = [{ 123: 'value1' }, { 456: 'value2' }]
const arr5: Array<number | string> = [123, 'string']
const arr6: Array<{ [key: string]: number } & { [key: number]: string }> = [
  { key1: 123 }
]

/**
 * 3. Enum
 *   枚举也是对象
 *   枚举编译成什么样？
 *   初始下标
 *   字符串枚举
 *   异构枚举
 *   常量枚举
 *   反向映射
 */
enum Color {
  Red,
  Green,
  Yellow
}
const color1: Color = Color.Green
// 枚举也是对象类型
obj4 = Color
console.log(Color.Red === 0) // true
console.log(Color.Green === 1) // true
console.log(Color.Yellow === 2) // true
/* 起始下标 */
enum Direction1 {
  // Up,
  Up = 10,
  Down,
  // Down = 10,
  Left,
  Right
}
console.log(Direction1.Up, Direction1.Down, Direction1.Left, Direction1.Right) // 10 11 12 13
/* 字符串枚举，要么都赋值，要不都不赋 */
enum Direction2 {
  Up = 'Up',
  // Down = 0,
  Down = 'Up',
  Left = 'Left',
  Right = 'Right'
}
console.log(Direction2.Up, Direction2['Right']) // Up Right
// 被编译为 var a = 'Up' 性能优化
const a = Direction2.Up
/* 异构枚举 */
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES'
}
console.log(
  BooleanLikeHeterogeneousEnum[0],
  BooleanLikeHeterogeneousEnum['No'],
  BooleanLikeHeterogeneousEnum['Yes']
) // No 0 YES

/**
 * Tuple 元祖类型
 *   限定类型
 *   限定数量
 *   限定位置
 *   相当于严格版数组
 *   允许使用 push 新增元素
 *   不允许访问越界元素
 */

/**
 * 顶级类型
 *   any
 *   unknown
 *     typescript3.3 引入
 *     比 any 更安全：被确定类型前不能进行任何操作（实例话、getter、函数执行等）
 */
/* any */
const any1: any = 123
const any2: any = 'str'
const any3: any = true
const any4: any = null
const any5: any = undefined
const any6: any = Symbol()
const any7: any = { w: 1 }
const any8: any = [123, 'string']
const any9: any[] = [123, 'string']
let value1: any
// value.foo.bar
// value()
// new value()
// value[0][1]
/* never */
// let value2: never
// value2.foo.bar
// value2()
// new value2()
// value2[0][1]
function getValue(value: unknown): string {
  // 缩小类型范围至其上保证有 toISOString 方法
  if (value instanceof Date) {
    return value.toISOString()
  }
  return String(value)
}

/**
 * 底部类型
 *   never 永远不存在的类型
 */
function exception1(message: string): never {
  throw new Error(message)
}
const infiniteFunc = (): never => {
  while (true) {}
}
// ❌ Type 'undefined' is not assignable to type 'never'.ts(2322)
const empty: never[] = []
