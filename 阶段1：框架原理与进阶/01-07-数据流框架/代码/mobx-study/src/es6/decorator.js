@fn
@fn2(20)
@fn3
class MyClass {
  @readonly message = 'hello'
  @noenumerable bar = 'foo'

  @noenumerable test () {
    console.log('hello test')
  }
}

function fn(target) {
  target.foo = 'bar'
}

function fn2(value) {
  return function (target) {
    target.count = value
  }
}

function fn3(target) {
  target.prototype.foo = 'baz'
}

function readonly(target, name, descriptor) {
  console.log(target) // 目标类的.prototype
  console.log(name) // 被修饰的类成员的名称
  console.log(descriptor) // 被修饰的类成员的描述对象
  descriptor.writable = false
}

function noenumerable(target, name, descriptor) {
  descriptor.enumerable = false
}

const c1 = new MyClass()
console.log(c1.message)

for (let key in c1) {
  console.log(key, c1[key])
}

c1.test()

// c1.message = 'world'

// console.log(c1.message)

// console.log(MyClass.foo) // => bar
// console.log(MyClass.count)
// console.log(new MyClass().foo)
