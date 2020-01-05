
// 在flow中如果想要为一个数据添加类型
// 1. 通过注释的方式进行添加
// 2. 通过直接改写js代码结构（推荐）


// 需要给文件添加@flow标记，否则flow不会对文件进行类型检测


var a /*: number*/ = 10;

var a: number = 10;

a = "abc";

console.log(a);


function sum(a: number, b: number) {
    return a + b;
}

sum(1, 2);
sum("123", "456")
