var redis = require('redis');
var client = new redis({
    // 配置
});

function incr($key) {
    client.watch($key);  // 一旦key被修改就要 组织事务的执行
    var value = client.get($key);

    if (!value) {
        value = 0;
    } else {
        client.multi();
        value ++;
        client.set(`${$key} ${value}`);
        client.exec();

        return value;
    }
}

