// 动态类型，类型检查的操作是在运行时进行的。
// 代码中的错误，只能在代码运行的时候被发现

// var num = 123;
// var num1 = 456;

// /**
//  * 函数接收两个参数，两个参数需要是数值类型的
//  * 函数的返回值为两个参数的和
//  */
// function sum(a, b) {
//     return a + b;
// }

// // console.log(sum(num, num1));

// console.log(sum("abc", 1));




function greet(obj) {
    obj.sayHello();
}

var o = {
    name: "张学友"
};

greet(o);