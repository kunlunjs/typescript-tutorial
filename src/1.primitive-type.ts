/**
 * 原始类型（primitive type）：
 *   number、string、boolean、null、undefined、void、symbol、bigint
 * 原始类型的字面量类型
 * 类型推断（抽象类型 -> 具体值表示类型）
 * 类型的逻辑运算
 */

/**
 * 1. number
 *   lib: ["dom", "ESNext"]
 *   二进制
 *   八进制
 *   十六进制
 *   BigInt:
 *     最低要求 typescript3.2
 *     大于 2^53 - 1 的整数
 *     需要开启 tsconfig.json target: ES2020 或 ESNext
 *     编译时开启 lib: ["ESNext"]
 *     https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt
 */
let decliteral: number
decliteral = 123
const binaryLiteral: number = 0b1010
const octalLiteral: number = 0o744
const hexLiteral: number = 0xf00d
const bigInt: bigint = 9007199254740991n
// 数字字面量类型
const num1 = 123
// tsconfig.json lib 需要包含 "dom"
console.log(typeof bigInt === 'bigint') // true
console.log(typeof BigInt('1') === 'bigint') // true
/* 解决大整数溢出无法表示问题 */
const max1 = Number.MAX_SAFE_INTEGER
console.log(max1 + 1 === max1 + 2) // true
const max2 = BigInt(Number.MAX_SAFE_INTEGER)
console.log(max2 + 1n === max2 + 2n) // false

/**
 * 2. string
 */
let str1: string
str1 = 'value'
// 字符串字面量类型
const str2 = 'value'

/**
 * 3. boolean
 */
let bol1: boolean
bol1 = false
// 布尔字面量类型
const bol2: boolean = true

/**
 * 4. null
 *   null 是所有类型的子类型
 *   strictNullChecks
 */
const nul: null = null
const nul1: number = null
const nul2: string = null
const nul3: boolean = null
const nul4: object = null
const nul5: undefined = null

/**
 * 5. undefined
 *   undefined 是所有类型的子类型
 *   void
 *     等效于 undefined
 *     只能赋值为 null 或 undefined
 *  @file  tsconfig.json {"compilerOptions": {"strictNullChecks": false}} 否则有警告
 */
const nil: undefined = undefined
const v2: void = null
const v1: void = undefined
// const v3: void = 123
const nul6: number = undefined
const nul7: string = undefined
const nul8: boolean = undefined
const nul9: object = undefined
const nul10: null = undefined

/**
 * 6. Symbol
 *   属于 es6 api
 *   target: es3|es5|es6   |es7   |es8   |es9   |es10  |es11
 *   target: ES3|ES5|ES2015|ES2016|ES2017|ES2018|ES2019|ES2020
 */
let sym: symbol
sym = Symbol()
