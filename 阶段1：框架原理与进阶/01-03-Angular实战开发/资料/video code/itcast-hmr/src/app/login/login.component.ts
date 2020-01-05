import { Component, OnInit } from '@angular/core'

// 导入需要使用的功能
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// 导入登录服务
import { LoginService } from './login.service'
// 导入路由服务
import { Router } from '@angular/router'
// 导入类型
import { LoginForm } from './login.type'

// token 接口
interface Token {
  token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}
  loginForm: FormGroup

  submitForm(): void {
    const loginForm = this.loginForm
    const { controls } = loginForm

    for (const i in controls) {
      if (controls.hasOwnProperty(i)) {
        controls[i].markAsDirty()
        controls[i].updateValueAndValidity()
      }
    }

    // 判断验证是否成功
    if (!loginForm.valid) {
      console.log('验证失败')
      return
    }

    // console.log('验证成功', loginForm.value)
    const { userName, password } = loginForm.value
    const loginParams: LoginForm = {
      username: userName,
      password
    }

    this.loginService.login(loginParams).subscribe((res: Token) => {
      // console.log('登录成功', res)
      // 存储token
      localStorage.setItem('itcast-token', res.token)
      this.router.navigate(['/home'])
    })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [
        'zqran',
        [Validators.required, Validators.minLength(3), Validators.maxLength(6)]
      ],
      password: [
        '123456',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,6}$/)]
      ]
    })
  }
}
