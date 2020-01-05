interface SumInterFace{
    (a: number, b: number): number
}

let sum: SumInterFace = function (a: number, b: number) {
    return a + b;
}