export const logger = store => {
  console.log('1111111111111111')
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    console.log(mutation)
  })
}
