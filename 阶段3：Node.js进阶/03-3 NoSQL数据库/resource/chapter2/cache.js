var redis = require('redis');
var client = new redis({
    // 配置
});

var rank = client.get('cache:rank');

if(!rank) {
    var $rank = jisuan();
    client.multi();
    client.set(`cache:rank ${$rank}`);
    client.expire(`cache:rank 7200`);
    client.exec();
}