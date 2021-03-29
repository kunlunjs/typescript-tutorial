/**
 * 装饰器
 *   原理
 *   装饰位置：类、方法、方法参数
 *   PropertyDescriptor 来自 node_modules/typescript/lib/lib.es5.d.ts
 *   reflect-matadata
 */

/**
 * 1. Class Decorators
 */
function First() {
  console.log(`First(): factory evaluated`)
  return function (
    taget: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`First(): called`)
  }
}

function Second() {
  console.log(`Second(): factory evaluated`)
  return function (
    taget: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`Second(): called`)
  }
}

class ExampleClass {
  @First()
  @Second()
  method() {}
}

/**
 * reflect-metadata
 */
import 'reflect-metadata'

class Point {
  constructor(public x: number, public y: number) {}
}

class Line {
  private _start: Point
  private _end: Point

  @Validate
  set start(value: Point) {
    this._start = value
  }

  get start() {
    return this._start
  }

  @Validate
  set end(value: Point) {
    this._end = value
  }

  get end() {
    return this._end
  }
}

function Validate<T>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  let set = descriptor.set!
  descriptor.set = function (value: T) {
    let type = Reflect.getMetadata('design:type', target, propertyKey)
    if (!(value instanceof type)) {
      throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`)
    }
    set.call(this, value)
  }
}

const line = new Line()
line.start = new Point(0, 0)

// line.end = {}
