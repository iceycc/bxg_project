import { Component, OnInit } from '@angular/core'

// 3 导入表单控件
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Validators.required 表示必填项
  // username = new FormControl('', [Validators.required])

  // 验证规则: 要求最少长度为3
  // username = new FormControl('', [Validators.minLength(3)])

  username = new FormControl('', [Validators.maxLength(6)])

  ngOnInit() {
    // console.log(this.username)
    // // 如果有required错误，就返回true
    // // 如果没有required错误，就返回false
    // console.log(this.username.hasError('required'))
  }
}
