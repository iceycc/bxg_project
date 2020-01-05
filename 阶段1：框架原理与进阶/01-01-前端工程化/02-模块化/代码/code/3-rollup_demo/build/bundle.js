(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    var module1 = {
        name: '小王',
        age: 29
    };

    const fn1 = () => {
        alert("fn1");
    };

    const fn2 = () => {
        alert("fn2");
    };

    console.log(module1);
    fn1();
    fn2();

})));
