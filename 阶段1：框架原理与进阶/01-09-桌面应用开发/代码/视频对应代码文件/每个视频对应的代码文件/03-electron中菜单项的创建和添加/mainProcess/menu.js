const {Menu} = require('electron')

// 构建具体的菜单顶
let template = [
    // 单个菜单项
    {
        label:'黑马计算器',
        submenu:[
            {
                label:'关于',
                click:function(){

                }
            },
            {
                label:'退出',
                // role:'quit',
                click:function(){
                    // 询问用户是否真的需要退出
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
                        return 'Command +F11'
                    }else{
                        return 'control + F11'
                    }
                })(),
               click:function(){
                console.log(123)
               }
            },
            {
                label:'字体增大',
                click:function(){

                }
            },
            {
                label:'字体减小',
                click:function(){
                    
                }
            },
            {
                label:'默认字体',
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