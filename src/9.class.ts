/**
 * class 类
 *   属性
 *     都是实例属性
 *   方法
 *     都是原型方法
 *   静态属性和静态方法
 *     只能通过类访问
 *     可被继承
 *   抽象类
 *   类实例属性的定义或初始化：
 *     1. 构造函数外
 *     2. 构造函数参数
 *   类成员修饰：
 *     public（默认）：可以本类中、实例和子类中都能访问
 *     private：只能本类内部访问
 *     protected：只能本类内部和子类内访问，实例不能访问
 *     readonly 只读
 *   class 可以作为接口
 */

/**
 * 类成员修饰符
 */
class Car {
  static st = 'hello'
  readonly attr = 'attribute'
  public pubattr: number
  constructor(public name: string, gold: boolean) {}
  public pub() {
    console.log('pub')
    this.pri()
    this.pro()
  }
  private pri() {
    console.log('pri...')
    this.pub()
    this.pro()
  }
  protected pro() {
    console.log('pro...')
    this.pub()
    this.pri()
  }
}
let car: Car
car = new Car('Jordan', true)
console.log(car.attr)
console.log(car.name)
// ❌ 类型“Car”上不存在属性“gold”。ts(2339)
// car.gold
// ❌ Cannot assign to 'attr' because it is a read-only property.ts(2540)
// car.attr = 123
car.pub()
// ❌ 属性“pri”为私有属性，只能在类“Car”中访问。ts(2341)
// car.pri()
// ❌ 属性“pro”受保护，只能在类“Car”及其子类中访问。ts(2445)
// car.pro()
class GTR extends Car {
  init() {
    // 可以访问父类中的 public 和 protected 成员
    this.pub()
    this.pro()
  }
}

/**
 * class 作为接口
 */
class UserEntity {
  username: string
  age: number = 18
  password: string
  updatedAt: Date
}
