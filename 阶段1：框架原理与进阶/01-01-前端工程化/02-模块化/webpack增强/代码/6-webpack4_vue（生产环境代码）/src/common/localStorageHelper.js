
const KEY = "goods"

export const getLocalGoods = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

export const getTotalCount = ()=>{
    //1.获取原先本地的数据 {87: 4, 88: 2}
    const localGoods = getLocalGoods()

    let totalCount = 0

    for(const key in localGoods){
        totalCount += localGoods[key]
    }

    return totalCount
}

/**
 * 按需导出，不要加default
 * @param {*} goods 类似于 {goodsId:87,count:3}
 */
export const addLocalGoods = goods => {
    //1.获取原先本地的数据 {87: 1, 88: 2}
    const localGoods = getLocalGoods()
    
    //2.处理，判断我传递过来的商品的goodsId是否在本地存在，如果存在，
    //就累加，如果不存在，就新增
    if(localGoods[goods.goodsId]){//存在
        localGoods[goods.goodsId] += goods.count
    } else {//不存在，不如 {goodsId:111,count:2}
        localGoods[goods.goodsId] = goods.count
    }

    //3.保存到本地 {87: 4, 88: 2}
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //4.返回本地最新的商品总数
    return getTotalCount()
}

/**
 * 按需导出，不要加default
 * @param {*} goods 类似于 {goodsId:87,count:3}
 */
export const updateLocalGoods = goods => {
    //1.先获取本地的商品对象
    const localGoods = getLocalGoods()

    //2.修改本地商品的数量
    localGoods[goods.goodsId] = goods.count

    //3.保存到本地 {87: 4, 88: 2}
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //4.返回本地最新的商品总数
    return getTotalCount()
}

/**
 * 按需导出，不要加default
 * @param {*} goodsId 类似于 goodsId就是商品的id
 */
export const deleteLocalGoodsById = goodsId =>{
    //1.先获取本地的商品对象
    const localGoods = getLocalGoods()

    //2.删除商品id对应的商品
    delete localGoods[goodsId]

    //3.保存到本地 {87: 4, 88: 2}
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //4.返回本地最新的商品总数
    return getTotalCount()
}