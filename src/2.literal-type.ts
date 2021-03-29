/**
 * 字面量类型 Literal Type
 *   布尔 bool
 *   数字 numeric
 *   字符串 string
 *   枚举 enum
 *   大整数 bigint
 * 类型字面量 Type Literal
 */

/**
 * 字面量类型即根据赋值自动进行类型推断
 */
let num = 123
// num1 = 'string'
let str = 'string'
// str1 = 123
let bol = false
// bol1 = 123

/**
 * 字面量类型
 */
const ln: 2333 = 2333
const lb: 0b10 = 2
const lo: 0o114 = 0b1001100
const lx: 0x514 = 0x514
const lbi: 0x1919n = 6425n
const ls: 'turing' = 'turing'
// 不能将类型“"nanjing"”分配给类型“"turing"”。ts(2322)
// const ls1: 'turing' = 'nanjing'
// 字面量结合联合类型获得良好的编辑器提示体验
type Direction = 'North' | 'East' | 'South' | 'West'
function move(distance: number, direction: Direction) {
  //TODO
}
// move(100, '')

/**
 * 类型字面量，类似与对象字面量，使用 type 打头，内部类型定义包含字面量
 */
type Foo = {
  baz: [number, 'haha']
  toString(): string
  readonly [Symbol.iterator]: 'github'
  0x1: 'foo'
  bar: 12n
}

/**
 * 可辨识联合类型
 */
type Info = {
  username: string
}
// 定义一个创建或删除或删除的接口数据类型
type UserAction =
  | {
      id: number
      action: 'delete' | 'update'
      info: Info
    }
  | {
      action: 'create'
      info: Info
    }
const UserReducer = (userAction: UserAction) => {
  switch (userAction.action) {
    case 'create':
      // ❌ 类型“{ action: "create"; info: Info; }”上不存在属性“id”。ts(2339)
      // console.log(userAction.id)
      break
    //TODO
    case 'delete':
      console.log(userAction.id)
      break
    default:
      break
  }
}
