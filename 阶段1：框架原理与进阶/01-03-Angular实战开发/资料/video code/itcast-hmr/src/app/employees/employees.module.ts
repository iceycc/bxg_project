import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// 导入 antd 模块
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { ReactiveFormsModule } from '@angular/forms'

import { EmployeesRoutingModule } from './employees-routing.module'
import { EmployeeListComponent } from './employee-list/employee-list.component'
import { EmployeeAddComponent } from './employee-add/employee-add.component'

@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  declarations: [EmployeeListComponent, EmployeeAddComponent]
})
export class EmployeesModule {}
