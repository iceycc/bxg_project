var btn2 = document.querySelector('#two')

var remote = require('electron').remote

btn2.onclick = ()=>{
    console.log('btn2')
    console.log(remote.getGlobal('shardData'))
}