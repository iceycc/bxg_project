import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { EmployeeListComponent } from './employee-list/employee-list.component'
import { EmployeeAddComponent } from './employee-add/employee-add.component'

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'add',
    component: EmployeeAddComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
