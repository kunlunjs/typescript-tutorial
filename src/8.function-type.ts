/**
 * 函数类型
 */

/**
 * 1. 形参
 * noImplicitAny
 */
function hello(person: string) {
  return 'hello' + person
}

/**
 * 2. 返回值类型
 * noImplicitAny
 */
function sum(a: number, b: number): number {
  return a + b
}

/**
 * 3. 空值
 */
function print(): void {
  console.log('no return')
}
function exception2(): never {
  throw new Error('异常')
}
