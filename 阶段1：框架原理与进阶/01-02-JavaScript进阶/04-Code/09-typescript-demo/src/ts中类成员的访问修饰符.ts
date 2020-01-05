// 访问修饰符：
// 指的就是可以在类的成员前通过添加关键字来设置当前成员的访问权限
// public: 公开的，默认   所有人都可以进行访问
// private： 私有的， 只能在当前类中进行访问
// protected： 受保护的，这能在当前类或者子类中进行访问


enum Color{
    red,
    yellow,
    blue
}

class Car{
    // 如果不加访问修饰符 则当前成员默认是公开的 所有人都可以访问的
    public color: Color
    constructor() {
        this.color = Color.red;
        // this.run();
        // this.loadPeople();
    }

    // 加了private之后，当前成员就只能在当前类中使用了！
    private run() {
        
    }

    // 加了protected之后，当前成员就只能在当前类或者子类中使用了！
    protected loadPeople() {
        
    }
}

let byd = new Car();
// byd.color
// byd.run();
// byd.loadPeople();


class Audi extends Car{
    sayHi() {
        console.log(this.color)
        // this.run();
        // this.loadPeople();
    }
}
let audi = new Audi();
// audi.color;
// audi.run();
