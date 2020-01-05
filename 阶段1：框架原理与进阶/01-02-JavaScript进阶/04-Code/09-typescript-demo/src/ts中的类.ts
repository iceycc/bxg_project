class Person{
    // 和ES6不同的是，TS中属性必须声明，需要指定类型
    name: string
    // 声明好属性之后，属性必须赋值一个默认值或者在构造函数中进行初始化
    age: number
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello(msg: string): void {
        console.log(msg);
    }
}