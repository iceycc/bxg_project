// 接口
// 接口可以理解为一个约定 一个规范


// // 接口使用interface进行生命
// interface AjaxOptions{
//     url: string,
//     // 给属性加上？之后，这个属性就是可选的！
//     type?: string,
//     data?: object,
//     success(data: object): void
// }


// // option参数中 需要包含 url type data success
// function ajax(options: AjaxOptions) {
    
// }

// ajax({
//     url: "http://www.baidu.com",
//     type: "get",
//     data: {},
//     success(data) {
        
//     }
// })

interface Point{
    readonly x: number,
    y: number,
    [propName: string]: any
}

let poi: Point = {
    x: 10,
    y: 10
}

// poi.x = 100;


let poi1: Point = {
    x: 10,
    y: 10,
    z: 100
}
