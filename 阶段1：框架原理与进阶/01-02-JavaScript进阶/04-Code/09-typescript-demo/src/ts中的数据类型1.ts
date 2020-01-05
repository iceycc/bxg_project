// object类型

// let o: object = {};
// let o1: object = [];

// 对象类型

let o: { name: string, age: number } = { name: "张学友", age: 18 };


// enum: 枚举类型

// gender: 0  1  -1

enum Gender{
    male = 1,
    female = 0,
    unknow = -1
}

let gender: Gender = Gender.male;

let obj = {
    gender: Gender.male
}

// 类型断言
let stri: any = "abc";
let len: number = (<string>stri).length;