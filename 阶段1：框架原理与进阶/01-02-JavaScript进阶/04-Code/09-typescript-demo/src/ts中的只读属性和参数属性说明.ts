class Cat{
    // 如果给属性添加了readonly修饰 则这个属性无法被赋值
    // 而且属性必须在声明的时候或者在构造函数中被赋值！
    readonly name: string
    // type: string
    // 构造函数中给参数前面加上修饰符，就相当于声明了一个属性！
    constructor(public type: string) {
        this.name = "加菲"
        // this.type = type
    }
}

var cat = new Cat("橘猫");
// cat.name = "123"
// cat.type;