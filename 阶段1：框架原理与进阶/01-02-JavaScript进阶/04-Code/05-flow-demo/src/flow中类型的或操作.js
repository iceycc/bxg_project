
// let a: number|string = 10;
// a = "abc";
// a = {};

// 类型推断
function test(a: number, b: number) {
    return a + b;
}

let c: string = test(1, 2);