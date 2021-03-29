/**
 * strictPropertyInitialization
 * 明确赋值断言
 * is
 * 可调用类型注解
 * 类型推导
 */

/**
 * 1. 明确赋值断言
 *   strictPropertyInitialization
 */
class StrictClass {
  foo: number
  bar = 'hello'
  // baz: boolean
  baz: boolean = false
  // constructor(public baz: boolean) {}
  constructor() {
    this.foo = 18
  }
}
// 使用 !
let x!: number
initialize()
console.log(x + x)
let y: number
initialize()
console.log(y! + y!)
function initialize() {
  x = 10
}

/**
 * 2. is 判断是否为某个类型
 *   类型谓语
 *   缩小类型范围
 */
function isString1(test: any): boolean {
  return typeof test === 'string'
}
function isString2(test: any): test is string {
  return typeof test === 'string'
}
function example(foo: number | string) {
  if (isString1(foo)) {
    // ❌ 类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。ts(2339)
    // console.log(foo.length)
  }
  if (isString2(foo)) {
    console.log(foo.length)
  }
}
example('hello world')

/**
 * 3. 可调用类型注解
 */
interface ToString1 {
  (): string
}
declare const doSomething1: ToString1
doSomething1()
// 构造函数
interface ToString2 {
  new (): string
}
declare const doSomething2: ToString2
new doSomething2()

/**
 * 4. 类型推导
 */
// 函数返回类型推导
function greeter(person: string) {
  return `hello ${person}`
}
// 多类型联合推导
const arr = [1, true, 'member', null, undefined, Symbol()]
// 解构推导
const bar = [1, 2]
let [a11, b11] = bar
// a11 = 'Michael'
const action1 = {
  type: 'update',
  payload: {
    id: 10
  }
}
