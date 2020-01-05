
function test(a: ?number) {
    a = a || 0;
    console.log(a);
}

test(10);

test();

// Maybe类型相当于给数据添加了两个可能的类型null和void