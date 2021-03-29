/**
 * 类型的逻辑运算
 *   | 联合类型：或
 *   & 交叉类型：与
 *   类型别名
 */

/**
 * 1. & 交叉类型，将多个类型合并为一个类型（同时满足）
 */
interface IAnyObject {
  [prop: string]: any
}
// 实现一个合并两个对象的函数
function mixin<T extends IAnyObject, U extends IAnyObject>(
  first: T,
  second: U
): T & U {
  // 范型对象存放结果
  const result = <T & U>{}
  // 现将 first 属性取出来
  for (let i in first) {
    ;(<T>result)[i] = first[i]
  }
  // 再将 second 属性取出来，注意去重
  for (let j in second) {
    if (!result.hasOwnProperty(j)) {
      ;(<U>result)[j] = second[j]
    }
  }
  return result
}
// test
const mi = mixin({ x: 1 }, { y: 2 })
console.log(mi.x, mi.y)

/**
 * 2. | 联合类型, 符合几种类型之一即可
 */
function formatCommandLine(command: string | string[]) {
  let line = ''
  if (typeof command === 'string') {
    line = command.trim()
  } else {
    line = command.join(' ').trim()
  }
}

/**
 * 3. 类型别名，为一组类型起名
 *   范型
 *   引用自己
 */
type Some = string | number
const b1: Some = 123
const b2: Some = 'value'
// 范型
type Container<T> = { value: T }
//
type Tree<T> = {
  label: string
  value: string
  children: Tree<T>
}
