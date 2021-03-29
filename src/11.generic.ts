/**
 * 范型 Generic
 *   什么是范型？
 *     为成员（接口、类的实例成员、类的方法、函数参数、函数返回值）提供或成员间提供类型约束
 *   范型解决什么问题？
 *     动态类型，可重用
 *   如何写？
 *   如何用？
 *   范型函数（函数、函数表达式、构造函数）、范型类、范型变量、范型接口、范型约束
 *   典型示例
 *   T U P
 *   注意：范型函数和范型类智能在定义时写
 */

/**
 * 1. 解决运行时动态类型的问题
 */
function returnItem1(param: string): string {
  return param
}
function returnItem2(param: number): number {
  return param
}
// <T> 捕获传入的参数类型，几个参数就写几个 “T”
function returnItem3<T>(param: T): T {
  return param
}
// 多类型参数
function swap<T, U, P>(p1: T, p2: U, p3: P): [U, T, P] {
  return [p2, p1, p3]
}

/**
 * 2. 范型变量：对范型进行包装
 */
function getArrayLength<T>(arg: Array<T>): number {
  // 如 arg 不是 Array<T> 则，arg 上可能没有 length 属性
  return arg.length
}

/**
 * 3. 范型接口，以接口的形式定义函数
 */
interface ReturnItemFn<T> {
  (para: T): T
}
const returnItem4: ReturnItemFn<number> = para => para

/**
 * 4. 范型类，使用范型定义类
 * 属性都是实例属性
 * 方法都是原型方法
 * 属性和方法包括静态的都可以被继承
 * 成员修饰
 *   private 本类
 *   public 放开
 *   protected 本类 子类
 */
class Stack1 {
  private arr: number[] = []
  // private pri: string
  constructor(private pri: string) {}
  public push(item: number) {
    this.arr.push(item)
  }
  public pop() {
    this.arr.pop()
  }
}
class Stack2<T> {
  private arr: T[] = []
  public push(item: T) {
    this.arr.push(item)
  }
  public pop() {
    this.arr.pop()
  }
}

/**
 * 5. 范型约束，对范型进一步加工，约束
 */
type Params1 = string | number
class Stack3<T extends Params1> {
  private arr: T[] = []
  public push(item: T) {
    this.arr.push(item)
  }
  public pop() {
    this.arr.pop()
  }
}
const stack3 = new Stack3<number>()
// ❌ 类型“boolean”不满足约束“Params”。ts(2344)
// const stack4 = new Stack3<boolean>()

/**
 * 6. 范型约束与范型索引，多参数的类型关联
 * noImplicitAny
 */
// function getValue(obj: object, key: string) {
//   // noImplicitAny: false 可规避
//   return obj[key]
// }
Object.keys({})
function getValue1<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]
}
// test
getValue1({ a: 1 }, 'a')
// ❌ 类型“"b"”的参数不能赋给类型“"a"”的参数。ts(2345)
// getValue({ a: 1 }, 'b')

/**
 * 7. 多重类型范型约束
 */
interface First {
  doSomething(): string
}
interface Second {
  doSomethingElse(): string
}
class Demo1<T extends First, U extends Second> {
  // private attr1: T
  // private attr2: U
  constructor(private attr1: T, private attr2: U) {}
  useT() {
    this.attr1.doSomething()
    // ❌ 类型“T”上不存在属性“doSomethingElse”。ts(2339)
    // this.attr1.doSomethingElse()
  }
  useU() {
    this.attr2.doSomethingElse()
  }
}
// 类型的多重继承
interface Child extends First, Second {}
class Demo2<T extends Child> {
  // private attr: T
  constructor(private attr: T) {}
  useT() {
    this.attr.doSomething()
    this.attr.doSomethingElse()
  }
}
// 等效于
class Demo3<T extends First & Second> {
  // private attr: T
  constructor(private attr: T) {}
  useT() {
    this.attr.doSomething()
    this.attr.doSomethingElse()
  }
}

/**
 * 构造函数范型
 */
function factory<T>(type: { new (): T }): T {
  return new type()
}
