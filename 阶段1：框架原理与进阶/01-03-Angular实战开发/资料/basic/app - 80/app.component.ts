import { Component } from '@angular/core'

// 3 导入表单控件
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}

  // loginForm = new FormGroup({
  //   username: new FormControl('传智播客'),
  //   password: new FormControl('', [Validators.required])
  // })

  loginForm = this.fb.group({
    username: [''],
    password: ['', Validators.required]
  })

  handleSubmit() {
    // console.log(
    //   '表单提交了',
    //   this.loginForm.value,
    //   '表单是否验证成功:',
    //   this.loginForm.valid
    // )

    if (this.loginForm.valid) {
      console.log('表单验证成功, 发送请求提交表单')
    } else {
      console.log('表单验证失败, 提示用户表单验证失败')
    }
  }
}
