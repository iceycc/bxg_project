// 散列其实就是hash  hget hset
var redis = require('redis');
var client = new redis({
//一些配置
});

// # 1. 文章的赋值
// # 自增的id 
var $post_id = client.incr('posts:count');
var $slug = 'hello-world';
var $title = 'hello world';
var $content = 'xxxxxxxxxxxxx';
var views = 0;
// # 文章的缩略名和id互相有一个引用来维持关系  slug.to.id
// # HSETNX 也是赋值  如果这个值已经存在 则返回0，并且赋值失败  反之返回1， 赋值成功
var isSlug = client.hsetnx(`slug.to.id ${$slug} ${$post_id}`);

// # 1.通过散列去存储文章
if(isSlug === 0) {
    client.exit();
} else {
    client.hmset(`post:${$post_id} title ${$title} content ${$content} views ${$views}`)
}

// # 2. 读取文章
var postID = client.hget('slug.to.id $slug'); 
if (!postID) {
    client.exit('文章不存在')
} else {
    var post = client.hgetall(`post:${postID}`, (err, data) => {
        console.log(data)
    })
}

// # 3.修改缩略名
// # 加入你要给id=42的文章  修改缩略名
var newSlug = 'xxx';
var isSlugExit = client.hsetnx(`slug.to.id ${newSlug} 42`) 

if(isSlugExit === 0) {
    exit('缩略名已存在，请换其它')
} else {
    var oldSlug = client = client.hget(`post:42 slug`);
    client.hset(`post:42 slug ${newSlug}`);
    client.hdel(`slug.to.id ${$oldSlug}`);
}


