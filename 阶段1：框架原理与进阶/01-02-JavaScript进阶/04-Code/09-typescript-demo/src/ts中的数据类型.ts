
// number
let a: number = 10;
let b: number = NaN;
let c: number = Infinity;
let d: number = 0xA12;
let e: number = 0b1010101;
let f: number = 0o75;

// string
let str: string = "这是一个字符串"
let str1: string = '这是一个字符串'
let str2: string = `hello 这是一个模板字符串${a}`

// boolean
let flag: boolean = true;
let flag1: boolean = false;

// 数组
// Array<数据类型>
let arr: Array<number> = [1, 2, 3, 4];

// 数据类型[]
let arr1: number[] = [1, 2, 3, 4];


// 元组（Tuple）
let arr2: [number, string] = [1, 'a'];

// arr2[0] = 'a';
// arr2[0] = 1000;

arr2[2] = 'a';
arr2[2] = 1;
// arr2[2] = [];

// void 空值
let res: void = undefined;

// undefined
// null
let res1: undefined = undefined;
let res2: null = null;

// any 表示任意类型
let somevar: any = 10;
somevar = "abc";
somevar = [];

// never类型
// never类型一般用在不可能返回内容的函数的返回值类型设置

function test(): never{
    while (true) {
        
    }
}
