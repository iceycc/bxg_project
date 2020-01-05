import { Component } from '@angular/core'

// 3 导入表单控件
import { FormControl, AbstractControl } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = new FormControl('', [this.customValidate])

  // 只要数据改变,就会执行自定义验证器
  customValidate(control: AbstractControl) {
    // console.log(control.value)
    if (/^[a-z]{3,6}$/.test(control.value)) {
      // 成功 返回 null
      return null
    }

    // 失败 返回 错误对象
    return { regerror: true }
  }
}
