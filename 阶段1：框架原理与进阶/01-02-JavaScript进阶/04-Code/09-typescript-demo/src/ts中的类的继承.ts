class Animal{
    age: number
    constructor(age: number) {
        this.age = age;
    }

    eat() {
        console.log("吃个大鸡腿儿")
    }
}


class Dog extends Animal{
    type: string
    constructor(type: string, age: number) {
        super(age);
        this.type = type;
    }

    // 子类中如果出现了和父类同名的方法，则会进行覆盖
    // 也就是调用的时候，调用的就是子类中的方法了！
    eat() {
        console.log('狗对象中的eat方法')
    }
}

var dog = new Dog("哈士奇", 18);

dog.eat();