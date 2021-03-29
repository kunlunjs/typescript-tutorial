/**
 * 高级工具类型
 * nodemodules/@types/typescript/lib/lib.es5.d.ts
 * T 表示范型，K 表示单类型，U表示多类型
 * Partial<T>
 * Readonly<T>
 * Pick<T, K>
 * Omit<T, K>
 * Required<T>
 * Record<K, T>
 * Exclude<T, U>
 * Extract<T, U>
 * ReturnType<T>
 * Parameters<T>
 * NonNullable<T>
 * ThisType<T>
 * ThisParameterType
 * OmitThisParameter
 * ContructorParameters<T>
 */

/**
 * 1. Partial 变为可选类型
 * type Partial<T> = { [P in keyof T]?: T[P] }
 * Partial<T> 从 T 中取部分参数
 */
interface Todo1 {
  title: string
  description: string
}
function updateTodo(todo: Todo1, fieldsToUpdate: Partial<Todo1>) {
  return { ...todo, ...fieldsToUpdate }
}
const todo1 = {
  title: 'organize desk',
  description: 'clear clutter'
}
const todo2 = updateTodo(todo1, {
  // description: 'throw out trash'
})

/**
 * 2. Required<T> 将可选类型转化为必选类型
 * type Required<T> = { [P in keyof T]-?: T[P] }
 */
interface Props {
  a?: number
  b?: string
}
const obj34: Props = { a: 5 }
const obj35: Required<Props> = {
  a: 5,
  b: 'b'
}

/**
 * 3. Readonly<T> 让所有 T 只读
 * type Readonly<T> = { readonly [P in keyof T]: T[P] }
 */
interface Todo2 {
  title: string
}
const todo3: Readonly<Todo2> = {
  title: 'Delete inactive users'
}
// ❌ Cannot assign to 'title' because it is a read-only property.ts(2540)
// todo.title = ''

/**
 * 4. Record<K, T> 生成一个以 K 为 key，以 T 为 value 的对象类型
 * type Record<K extends keyof any, T> = { [P in K]: T }
 * K 是对象的 key
 * T 是对象的 value，只含有 title 一个 key，且 value 是 string
 */
interface Pageinfo {
  title: string
}
type Page = 'home' | 'about' | 'contact'
const todo4: Record<Page, Pageinfo> = {
  home: { title: 'home' },
  about: { title: 'about' },
  contact: { title: 'contact' }
}

/**
 * 5. Pick<T, K> 从 T 中择取 K 作为类型约束
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] }
 */
interface Todo3 {
  title: string
  description: string
  completed: boolean
}
type TodoPreview1 = Pick<Todo3, 'title' | 'completed'>
const todo5: TodoPreview1 = {
  title: 'Clean room',
  completed: true
}

/**
 * 6. Omit<T, K> 从 T 中拿掉 K 属性
 * type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
 * 和 Exclude<T, U> 区别是 K 是单个，U 是多个
 */
interface Todo4 {
  title: string
  description: string
  completed: boolean
}
type TodoPreview2 = Omit<Todo4, 'description'>
const todo6: TodoPreview2 = {
  title: 'Clean room',
  completed: false
}

/**
 * 7. Exclude 排除多个类型
 * type Exclude<T, U> = T extends U ? never : T
 * Exclude<T, U> 从 T 中拿掉 U（多个）
 */
type T01 = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type T02 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // 'c'
type T03 = Exclude<string | number | (() => void), Function> // string | number

/**
 * 8. Extract<T, U> 取交集
 * type Extract<T, U> = T extends U ? T : never
 */
type T04 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // 'a'
type T05 = Extract<string | number | (() => void), Function> // () => void

/**
 * 9. NonNullable<T> 取出非空（null、undefined）类型
 * type NonNullable<T> = T extends null | undefined ? never : T
 */
type T06 = NonNullable<string | number | undefined> // string | number
type T07 = NonNullable<string[] | null | undefined> // string[]

/**
 * 10. Parameters<T> 取出函数入参类型，即 arguments 类型，无参数则为 []
 * type Parameters<T extends (...args: any)> => any> = T extends (...args: infer P) => any ? P : never
 */
declare function f1(arg: { a: number; b: string }): void
type T08 = Parameters<() => string> // []
type T09 = Parameters<(s: string) => void> // [string]
type T13 = Parameters<<T>(arg: T) => T> // [unkown]
type T14 = Parameters<typeof f1> // [{a: number; b: string;}]
type T15 = Parameters<any> // unkown[]
type T16 = Parameters<never> // never
// ❌ 类型“string”不满足约束“(...args: any) => any”。ts(2344)
// type T17 = Parameters<string>
// ❌ 类型“Function”提供的内容与签名“(...args: any): any”不匹配。ts(2344)
// type T18 = Parameters<Function>

/**
 * 11. ConstructorParameters<T> 取出构造函数参数类型
 * type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never
 */
type T17 = ConstructorParameters<ErrorConstructor> // [(string | undefined)?]
type T18 = ConstructorParameters<FunctionConstructor> // string[]
type T19 = ConstructorParameters<RegExpConstructor> // [string, (string | undefined)?]

/**
 * 12. ReturnType<T> 取出函数返回值类型
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
 */
declare function f2(): { a: number; b: string }
type T20 = ReturnType<() => string> // string
type T21 = ReturnType<(s: string) => void> // void
type T22 = ReturnType<<T>() => T> // unkown
type T23 = ReturnType<<T extends U, U extends number[]>() => T> // number[]
type T24 = ReturnType<typeof f2> // {a: number, b: string}
type T25 = ReturnType<any> // any
type T26 = ReturnType<never> // never
// ❌ 类型“string”不满足约束“(...args: any) => any”。ts(2344)
// type T27 = ReturnType<string>
// ❌ 类型“Function”提供的内容与签名“(...args: any): any”不匹配。ts(2344)
// type T28 = ReturnType<Function>

/**
 * 13. InstanceType<T> 实例类型
 * type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any
 */
class C1 {
  x = 0
  y = 0
}
type T27 = InstanceType<typeof C1> // C1
type T28 = InstanceType<any>
type T29 = InstanceType<never> // never
// ❌ 类型“string”不满足约束“new (...args: any) => any”。ts(2344)
// type T30 = InstanceType<string>
// ❌ 类型“Function”提供的内容与签名“new (...args: any): any”不匹配。ts(2344)
// type T31 = InstanceType<Function>

/**
 * 14. ThisParameterType<T> 获取 this 类型，用于 apply、call、bind等场景
 * type ThisParameterType<T> = T extends (this: unknown, ...args: any[]) => any ? unknown : T extends (this: infer U, ...args: any[]) => any ? U : unknown
 */
function toHex1(this: number) {
  return this.toString(16)
}
// function numberToString(n: Number): string
/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type*/
function numberToString(n: ThisParameterType<typeof toHex1>) {
  return toHex1.apply(n)
}

/**
 * 15. OmitThisParameter<T> 排除掉 T 类型
 * type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T
 * 需要开启 --strictFunctionTypes
 */
function toHex2(this: number) {
  return this.toString(16)
} // () => string
const fiveToHex: OmitThisParameter<typeof toHex2> = toHex2.bind(5)

/**
 * 16. ThisType<T>
 */
type ObjectDecriptor<D, M> = {
  data?: D
  methods?: M & ThisType<D & M>
}
// function makeObject<D, M>(desc: ObjectDecriptor<D, M>): D & M
function makeObject<D, M>(desc: ObjectDecriptor<D, M>) {
  const data: object = desc.data || {}
  const methods: object = desc.methods || {}
  return { ...data, ...methods } as D & M
}
// { x: number; y: number; } & { moveBy(dx: number, dy: number): void; }
const obj31 = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx
      this.y += dy
    }
  }
})
obj31.x = 10
obj31.y = 20
obj31.moveBy(5, 5)

/**
 * Obtain the parameters of a constructor function type in a tuple
 * type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
 */
class TestClass {
  constructor(public name: string, public age: number) {}
}

type Params = ConstructorParameters<typeof TestClass> // [string, name]

/**
 * Obtain the return type of a constructor function type
 * type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
 */
type Instance = InstanceType<typeof TestClass> // TestClass
