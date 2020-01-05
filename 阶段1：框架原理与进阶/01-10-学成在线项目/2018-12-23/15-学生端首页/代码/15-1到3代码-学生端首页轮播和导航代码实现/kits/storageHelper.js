
// 负责操作sessionStorage的曾，查，删三个操作

const KEY = 'USER_INFO'

// 1.0 增加数据到sessionStorage
// userinfo:就是一个js对象，在此方法中会通过JSON.stringify方法将其转换成json字符串保存
export function setUser(userinfo){
    sessionStorage.setItem(KEY,JSON.stringify(userinfo || {}))
}

// 2.0 从sessionStorage中查询数据
export function getUser(){
  var userinfoJsonString = sessionStorage.getItem(KEY)
  return JSON.parse(userinfoJsonString || '{}')
}

// 3.0 从sessionStorage中删除数据
export function removeUser(){
    sessionStorage.removeItem(KEY)
}