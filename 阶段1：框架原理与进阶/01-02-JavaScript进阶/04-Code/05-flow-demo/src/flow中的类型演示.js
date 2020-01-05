

// number类型
// number类型可以赋值的内容为： 数字、NaN、Infinity
let a: number = 100;
let b: number = NaN;
let c: number = Infinity;

// string类型
// string类型可以赋值的内容为: 字符串
let str: string = "abc";

// boolean 布尔值类型
// void  javascript中的undefined
// null  js中的null

// Array类型
// 在声明数据为数组类型的时候，我们需要为数组指定元素的类型
let arr: Array<number> = [1, 2, 3, 4];

let name: any = 123;
name = "123"

let arr1: Array<any> = [1, 'a', {}, []];