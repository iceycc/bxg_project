import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { EmployeesService } from '../employees.service'

import { NzMessageService } from 'ng-zorro-antd'

import { Router } from '@angular/router'

// 手机号码的正则
const PHONE_NUMBER_REGEXP = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private nzMsgService: NzMessageService,
    private router: Router
  ) {}

  employeeAddForm: FormGroup

  ngOnInit() {
    this.employeeAddForm = this.fb.group({
      // 注意：如果有两个及其以上的验证规则，需要使用 [] 来包裹
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['0', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern(PHONE_NUMBER_REGEXP)],
      joinDate: ['', this.joinDateValidate]
    })
  }

  // 日期的自定义校验规则
  joinDateValidate(control: FormControl) {
    const selectDate = +control.value
    // console.log(selectDate)
    const curDate = +new Date()

    if (selectDate > curDate) {
      return { date: true }
    }

    return null
  }

  submitForm = $event => {
    $event.preventDefault()
    const employeeAddForm = this.employeeAddForm
    const { controls } = employeeAddForm

    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty()
      controls[key].updateValueAndValidity()
    })

    if (!employeeAddForm.valid) {
      return
    }

    // 发起请求，添加员工
    let { joinDate } = employeeAddForm.value
    if (!joinDate) {
      // 初始化默认日期
      joinDate = +new Date()
    }
    const params = { ...employeeAddForm.value, joinDate: joinDate - 0 }
    // console.log(params)
    this.employeesService.addEmployee(params).subscribe(res => {
      // console.log(res)
      this.nzMsgService.create('success', '添加员工成功')
      this.resetEmployee()
      this.router.navigate(['/home/employee'])
    })
  }

  resetEmployee() {
    const employeeAddForm = this.employeeAddForm
    const { controls } = employeeAddForm

    this.employeeAddForm.reset({
      gender: '0'
    })
    Object.keys(controls).forEach(key => {
      controls[key].markAsPristine()
      controls[key].updateValueAndValidity()
    })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault()
    this.resetEmployee()
  }
}
