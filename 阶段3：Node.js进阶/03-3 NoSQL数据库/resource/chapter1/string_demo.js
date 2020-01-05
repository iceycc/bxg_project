// 字符串 
// 存储过程
var redis = require('redis');
var client = new redis({

});

var $post_id = client.incr('post:count');

var $airticle = JSON.stringify({
    title: 'hello',
    content: 'world',
    views: 0
})

// 赋值
client.set(`post:${$post_id}:data ${$airticle}`);


// 读取过程

var airticle = client.get('post:1:data');

var data = JSON.parse(airticle);

$object = JSON.parse($airticle2) # 转成真正的对象  

# 每次访问文章 都会调用 

$postID = INCR post:count  # 文章递增的id