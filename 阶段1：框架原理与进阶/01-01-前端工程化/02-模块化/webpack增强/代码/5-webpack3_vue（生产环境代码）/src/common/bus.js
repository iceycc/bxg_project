import Vue from 'vue'

const bus = new Vue()

//按需导出写法1
export {bus}

//默认导出
// export default bus

//按需导出写法two
// export const bus = new Vue() 这种也OK