// 引入
const { Tray, Menu, dialog } = require('electron')
var path = require('path')


// 使用函数封装创建系统托盘图标
function createTray(win) {
    // 创建系统托盘图标对象
    let tray = new Tray(path.join(__dirname, '../images/tray.png'))

    // 创建系统托盘的上下文菜单--右键菜单
    const menu = Menu.buildFromTemplate([
        {
            label: '关闭',
            click: () => {
                // 弹出提示对话框
                dialog.showMessageBox({
                    type: 'info',
                    title: '退出提示',
                    message: '请问是否真的需要退出',
                    buttons: ['确定', '取消']
                }, (index) => {
                    if (index == 0) {
                        // console.log('要退出了')
                        // 销毁图标
                        tray.destroy()
                        // 销毁窗体，实现退出
                        win.destroy()
                    }
                })
            }
        }
    ])


    // 为系统托盘图标添加事件
    tray.on('click',() => {
        // 实现窗口的显示和隐藏  如果当前是显示的>>隐藏  如果是隐藏的>>显示
        // isVisible():判断当前窗口是否是可见状态
        if(win.isVisible()){
            win.hide()
            win.setSkipTaskbar(true)
        }else{
            win.show()
            win.setSkipTaskbar(false)
        }
    })

    // 设置鼠标指针在托盘图标上悬停时显示的文本
    tray.setToolTip('黑马程序员欢迎你')

    // 设置这个图标的内容菜单
    tray.setContextMenu(menu)
}

// 暴露成员 
module.exports = createTray