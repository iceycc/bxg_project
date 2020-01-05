
function test(a: number, b: number): number{
    return a + b;
}

// var a: string = test(1, 2);

// 可以将变量声明为函数类型
// 也就意味着我们可以指定为变量赋值的函数的类型
let func: (a: number, b: number) => string = test;

function ajax(callback: (data: Object) => void) { 

}

ajax(function (obj: Object) { 

})