/**
 * 构造函数
 */

function Human(name) {
  this.name = name || 'i have no name!'
  this.hello = 'hello!'
  this.sayName = function () {
    console.log(this.name)
  }
  this.sayHello = sayHello
}

function sayHello() {
  console.log(this.hello)
}

var me = new Human('cyl')
var you = new Human('you')

console.log('me.sayName == you.sayName', me.sayName == you.sayName)
console.log('me.sayHello == you.sayHello', me.sayHello == you.sayHello)

console.log('me instanceof Human', me instanceof Human)
console.log('you instanceof Human', you instanceof Human)

console.log('Human.prototype.isPrototypeOf(me)', Human.prototype.isPrototypeOf(me))

/**
 * 原型模式
 */
function Box() {
  this.n1 = 'n222'
}
Box.prototype.name = '111'
Box.prototype.sayName = function () {
  console.log(this.name)
}
Box.prototype.sayN1 = function () {
  console.log(this.n1)
}

var box1 = new Box()
var box2 = new Box()

box1.sayName()
box2.sayName()

box2.name = '222'

box1.sayName()
box2.sayName()

console.log('box1.sayName == box2.sayName', box1.sayName == box2.sayName)

delete box2.name

box1.sayName()
box2.sayName()

box1.n1 = 'n1111'
box1.sayN1()
box2.sayN1()

delete box1.n1
box1.sayN1()
box2.sayN1()




console.log('box1.__proto__', box1.__proto__)
console.log('box1.constructor', box1.constructor)

console.log(1 instanceof Object)
console.log('2121' instanceof Object)
console.log(false instanceof Object)
console.log(true instanceof Object)
console.log({} instanceof Object)
console.log([] instanceof Object)
console.log(box1 instanceof Object)
console.log(Box instanceof Object)

console.log(3 == '3')
console.log(3 === '3')