// infer 表示在 extends 条件语句中待推断的类型变量

// T 如果能赋值给 `(param: infer P) => any` 则结果是 P，否则是 T
type ParamType<T> = T extends (param: infer P) => any ? P : T

// example
interface User11 {
  name: string
  age: number
}
type Func = (user: User11) => void
type Param = ParamType<Func> // User11
type AA = ParamType<string> // string

type Constructor = new (...arags: any[]) => any

// tuple 转 union [string, number] -> string | number
type TTule = [string, number]
type TArray = Array<string | number> // (string | number)[]
type Res = TTule extends TArray ? true : false // true
type Res0 = TArray extends TTule ? true : false // false
type ElementOf<T> = T extends Array<infer E> ? E : never
type TTuple = [string, number]
type ToUnion = ElementOf<TTule> // string | number
