const {Menu,BrowserWindow,dialog} = require('electron')
var path = require('path')

// 构建具体的菜单顶
let template = [
    // 单个菜单项
    {
        label:'黑马计算器',
        submenu:[
            {
                label:'关于',
                click:function(){
                    hm_aboutWindow()
                }
            },
            {
                label:'退出',
                // role:'quit',
                click:function(item,win,event){
                    // 询问用户是否真的需要退出
                    dialog.showMessageBox({
                        // 消息框的类型
                        type:'info',
                        // 标题
                        title:'退出提示',
                        message:'请问是否真的需要退出',
                        buttons:['确定','取消']
                    },(index) => {
                        if(index == 0){
                            // 销毁当前窗体
                            win.destroy()
                        }
                    })
                }
            }
        ]
    },
    {
        label:'格式',
        submenu:[
            {
               label:'颜色' ,
                //    accelerator:'F11',
                accelerator:(function(){
                    // 判断系统的类型
                    if(process.platform =='darwin'){
                        return 'command + shift + c'
                    }else{
                        return 'control + shift + c'
                    }
                })(),
               click:function(){
                    hm_setColor()
               }
            },
            {
                label:'字体增大',
                accelerator:'F11',
                click:function(){

                }
            },
            {
                label:'字体减小',
                accelerator:'F12',
                click:function(){
                    
                }
            },
            {
                label:'默认字体',
                accelerator:'F10',
                click:function(){
                    
                }
            }
        ]
    }

]

// 为应用程序构建菜单项
let menu = Menu.buildFromTemplate(template)
// 将构建好的菜单项添加到应用程序
Menu.setApplicationMenu(menu)

// 展示关于页面
function hm_aboutWindow(){
    let win = new BrowserWindow({
        width:250,
        height:250,
        title:'关于黑马计算器'
    })
    // 加载about静态页面
    win.loadURL(path.join(__dirname,'../views/about.html'))
    // 设置当前窗体不显示菜单项
    win.setMenu(null)
}

// 展示选择颜色页面
function hm_setColor(){
    let win = new BrowserWindow({
        width:250,
        height:100,
        title:'选择颜色'
    })
    win.loadURL(path.join(__dirname,'../views/color.html'))
    // 设置不展示菜单项
    win.setMenu(null)
}