var redis = require('redis');
var client = new redis({
    // 配置
});

// post:list已经有值  通过lpush

var currentPage = 1;  // 当前页面为1
var listLength = 10;

var start = (currentPage - 1) * listLength;
var end = currentPage * listLength - 1; // 0-9

var postIdArrHash = client.lrange(`post:list ${start} ${end}`);  // postIdArr此时还是一个列表 里面 存储的 散列

postIdArrHash.forEach((id) => {
    client.hgetall(`post:${id}`, (data) => {
        console.log(data);
    })
});