const axios = require('axios');
// 调用天气接口获取数据
module.exports.getData = async () => {
  let ret = await axios.get('http://www.weather.com.cn/data/cityinfo/101010100.html')
  let info = ret.data.weatherinfo;
  return {
    wea: info.weather,
    temp: info.temp1
  }
}
