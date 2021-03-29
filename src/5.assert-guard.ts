/**
 * 类型断言，解决不能正确推断类型的问题
 * 类型守卫，缩小类型范围
 *   instanceof
 *   in
 *   literal
 */

/**
 * 1. 类型断言
 */
const person = {}
// ❌ 类型“{}”上不存在属性“name”。ts(2339)
// person.name = 'haha'
// 解决方案 1：类型断言，为对象加上类型
interface Person {
  name: string
  age: number
}
const person1 = {} as Person
person1.name = 'haha'
// 双重断言
const person2 = ('haha' as any) as Person

// 解决方案 2，更宽泛的类型定义
interface Person3 {
  [propName: string]: any
}
const person3: Person3 = {}
person3.name = 'haha'

/**
 * 类型守卫
 */
class Person {
  name = 'haha'
  age = 20
}

class Animal {
  name = 'petty'
  color = 'pink'
}
function getSometing(arg: Person | Animal) {
  // 类型细化为 Person
  if (arg instanceof Person) {
    // console.log(arg.color) // Error，因为arg被细化为Person，而Person上不存在 color属性
    console.log(arg.age) // ok
  }
  // 类型细化为 Person
  if (arg instanceof Animal) {
    // console.log(arg.age) // Error，因为arg被细化为Animal，而Animal上不存在 age 属性
    console.log(arg.color) // ok
  }
  if ('age' in arg) {
    // console.log(arg.color) // Error
    console.log(arg.age) // ok
  }
  if ('color' in arg) {
    // console.log(arg.age) // Error
    console.log(arg.color) // ok
  }
  if (arg.name === 'haha') {
    console.log(arg.name) // ok
    // console.log(arg.bar) // Error
  } else {
    // console.log(arg.foo) // Error
    console.log(arg.name) // ok
  }
}

export {}
