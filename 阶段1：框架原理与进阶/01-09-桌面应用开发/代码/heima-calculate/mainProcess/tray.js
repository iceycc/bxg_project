const { Tray, Menu, dialog } = require('electron')
var path = require('path')


function createTray(win) {

    // 创建tray对象
    let tray = new Tray(path.join(__dirname, '../images/tray.png'))

    // 创建系统托盘的菜单项
    let menu = Menu.buildFromTemplate([
        {
            label: '关闭',
            click: () => {
                dialog.showMessageBox({
                    type: 'info',
                    title: '退出提示',
                    message: '请问是否真的需要退出',
                    buttons: ['确定', '取消']
                }, (index) => {
                    if (index == 0) {
                        win.destroy()
                        tray.destroy()
                    }
                })
            }
        }
    ])

    // 设置鼠标指针在托盘图标上悬停时显示的文本
    tray.setToolTip('黑马程序员')

    // 设置当前系统托盘的上下文菜单
    tray.setContextMenu(menu)
}

module.exports = createTray