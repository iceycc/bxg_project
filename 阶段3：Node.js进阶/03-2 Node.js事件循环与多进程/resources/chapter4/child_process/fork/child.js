process.on('message', (data) => {
    console.log('儿子接收到的消息', data)
})

// 给父亲发送
process.send('爸爸你好');