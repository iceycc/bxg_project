const http = require('http');

var data = {
    aaa: 111,
    bbb: 222,
    ccc: () => {}
}
console.log('http', http);

http.createServer((req, res) => {
    res.end('hello');
}).listen(8000, () => {
  console.log('server is listening: ' + 8000);
});
