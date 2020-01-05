
// 1.0 定义数据服务基本url
const baseUrl = 'http://157.122.54.189:9092'

// 1.0.1 封装一个基本的fetch请求
function fetchHelper(urlPath,options){
    return fetch(baseUrl+urlPath,options)
}

fetchHelper.url = baseUrl;

// 2.0 封装好get请求
fetchHelper.get = function(urlPath) {
    return fetch(baseUrl+urlPath,{
        method:'GET',
        cache:'no-cache',  //请求不被缓存
        credentials:'include'  //允许跨域携带cookies,实际上是将sessinid传入到数据服务
    })
    .then(response=>{
        // 判断响应的状态码是否为200，如果是则继续下一步，否则抛出异常
        if(response.status ==200){
            // 将响应报文体中的数据已json格式返回
            return response.json()
        }else{
            throw new Error('fetch请求状态异常')
        }
    })
    .catch(error=>{
        throw new Error('fetch请求状态错误')
    })
}

// 3.0 封装好post请求
// body:两个格式，1、json格式 2、url参数的格式 uid=1&uname=1223
// 约定:body参数是一个js对象，在此方法中通过JSON.stringify转成json字符串
fetchHelper.post = function(urlPath,body) {
    return fetch(baseUrl+urlPath,{
        method:'POST',
        headers:{
            // 告诉服务器当前请求报文体中的数据格式为json格式
            'Content-Type':'application/json;charset=UTF-8' 
        },
        body:JSON.stringify(body),
        cache:'no-cache',  //请求不被缓存
        credentials:'include'  //允许跨域携带cookies,实际上是将sessinid传入到数据服务
    })
    .then(response=>{
        // 判断响应的状态码是否为200，如果是则继续下一步，否则抛出异常
        if(response.status ==200){
            // 将响应报文体中的数据已json格式返回
            return response.json()
        }else{
            throw new Error('fetch请求状态异常')
        }
    })
    .catch(error=>{
        throw new Error('fetch请求状态错误')
    })
}

// 导出fetchHelper函数
export default fetchHelper