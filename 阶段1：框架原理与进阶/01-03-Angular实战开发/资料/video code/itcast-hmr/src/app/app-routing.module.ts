import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'

// 导入守卫服务
import { AuthGuard } from './auth.guard'

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // 路由守卫
    canActivate: [AuthGuard],

    // 子路由
    children: [
      {
        path: 'employee',
        loadChildren: './employees/employees.module#EmployeesModule'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
  // // 异步加载的路由，实际上加载的是模块
  // {
  //   path: 'employee',
  //   // 要将异步加载模块的路径以及模块名称配置在此处
  //   // 语法： 异步加载模块的路径#模块名称
  //   loadChildren: './employees/employees.module#EmployeesModule'
  // }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
