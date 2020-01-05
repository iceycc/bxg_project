function incr ($key) {  // 通过get 和set去实现incr方法
    var $value = redis.get($key);  // 假设redis是一个对象，可以去操作数据

    if (!$value) {
        $value = 0;
    } else {
        $value ++;
        return $value;
    }
}