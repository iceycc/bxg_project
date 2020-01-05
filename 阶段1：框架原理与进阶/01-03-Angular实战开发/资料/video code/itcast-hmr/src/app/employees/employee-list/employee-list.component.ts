import { Component, OnInit } from '@angular/core'

// 导入服务
import { EmployeesService } from '../employees.service'
// 导入接口
import { Employee } from '../employee.type'
// 导入HttpResponse
import { HttpResponse } from '@angular/common/http'
// 导入antd服务
import { NzMessageService } from 'ng-zorro-antd'

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

// 手机号码的正则
const PHONE_NUMBER_REGEXP = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private employeesService: EmployeesService,
    private nzMsgService: NzMessageService,
    private fb: FormBuilder
  ) {}

  // 数据
  employeesList: Employee[] = []

  // 控制编辑员工对话框
  isShowEmployeeModal = false
  employeeEditForm: FormGroup
  editEmployeeId: number

  // 分页相关的数据
  curPage = 1
  pagesize = 5
  total: number

  // 是否加载中
  isLoading: boolean

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

  // 封装获取数据方法
  fetchData() {
    // console.log(this.curPage)
    this.isLoading = true

    this.employeesService
      .fetchData(this.curPage, this.pagesize)
      .subscribe((res: HttpResponse<Employee[]>) => {
        // console.log(res)
        // console.log(typeof res.headers.get('X-Total-Count'))

        // 总条数
        this.total = +res.headers.get('X-Total-Count')
        this.employeesList = res.body
        this.isLoading = false
      })
  }

  // 列表追踪
  trackByEmpId(index: number, employee: Employee) {
    return employee.id
  }

  // 删除员工
  handleDelete(id: number) {
    // console.log('确认删除', id)
    this.employeesService.delEmployee(id).subscribe(res => {
      // console.log(res)

      this.employeesList = this.employeesList.filter(
        employee => employee.id !== id
      )

      // this.fetchData()
    })
  }
  handleDelCancel() {
    // console.log('取消删除')
    this.nzMsgService.info('取消删除', { nzDuration: 1000 })
  }

  // 弹出修改员工对话框
  showEditEmployeeModal(id: number) {
    this.isShowEmployeeModal = true
    this.editEmployeeId = id

    // 根据id获取员工信息
    this.employeesService
      .getEmployeeById(id)
      .subscribe((employee: Employee) => {
        // console.log(employee)

        // 将获取到的员工数据展示在表单中
        const { joinDate } = employee
        this.employeeEditForm.patchValue({
          ...employee,
          joinDate: +new Date(joinDate)
        })
      })
  }

  // 取消编辑
  handleEditEmployeeCancel() {
    // console.log('取消编辑')
    this.isShowEmployeeModal = false

    this.resetEmployee()
  }

  // 确认修改
  editEmployee() {
    // console.log('确认修改')
    const employeeEditForm = this.employeeEditForm
    const { controls } = employeeEditForm

    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty()
      controls[key].updateValueAndValidity()
    })

    // console.log(employeeEditForm.valid)
    if (!employeeEditForm.valid) {
      return
    }

    let { joinDate } = employeeEditForm.value
    if (!joinDate) {
      // 初始化默认日期
      joinDate = +new Date()
    }
    const params = { ...employeeEditForm.value, joinDate: joinDate - 0 }

    this.employeesService
      .updateEmployeeById(this.editEmployeeId, params)
      .subscribe((res: Employee) => {
        // console.log('编辑成功：', res)
        this.isShowEmployeeModal = false
        const index = this.employeesList.findIndex(
          employee => employee.id === res.id
        )
        this.employeesList[index] = res

        this.resetEmployee()
      })
  }

  resetEmployee() {
    const employeeEditForm = this.employeeEditForm
    const { controls } = employeeEditForm

    this.employeeEditForm.reset()
    Object.keys(controls).forEach(key => {
      controls[key].markAsPristine()
      controls[key].updateValueAndValidity()
    })
  }

  ngOnInit() {
    this.fetchData()

    this.employeeEditForm = this.fb.group({
      // 注意：如果有两个及其以上的验证规则，需要使用 [] 来包裹
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['0', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern(PHONE_NUMBER_REGEXP)],
      joinDate: ['', this.joinDateValidate]
    })
  }
}
