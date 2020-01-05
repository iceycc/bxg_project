import { Component } from '@angular/core'

// 3 导入表单控件
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = new FormControl('传智播客')
  password = new FormControl('')

  // 获取用户名
  getUserName() {
    console.log('当前用户名为：', this.username.value)
  }

  // 更新用户名
  setUserName() {
    this.username.setValue('博学谷')
  }
}
