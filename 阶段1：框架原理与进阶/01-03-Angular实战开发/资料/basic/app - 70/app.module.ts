import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
// 1 导入路由模块
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { NotfoundComponent } from './notfound/notfound.component'
import { EmployeeComponent } from './employee/employee.component'

// 2 配置路由规则
const appRoutes: Routes = [
  {
    // 默认路由
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,

    // 配置子路由
    children: [
      {
        path: 'employee',

        // 如果为空，则立即展示该组件
        // path: '',
        component: EmployeeComponent
      }
    ]
  },

  // 通配符路由
  // 注意：应该出现在路由规则的最后！！！
  {
    path: '**',
    component: NotfoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    EmployeeComponent
  ],
  // 3 配置路由模块
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
