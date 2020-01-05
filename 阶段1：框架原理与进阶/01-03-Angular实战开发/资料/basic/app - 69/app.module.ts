import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
// 1 导入路由模块
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { NotfoundComponent } from './notfound/notfound.component'
import { CarComponent } from './car/car.component'

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
    component: HomeComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  // 配置汽车品牌路由
  {
    // :id 表示路由参数
    // 能匹配： /car/1 或 /car/2 或 /car/3 ...
    // 不能匹配： /car 或 /car/2/info
    path: 'car/:id',
    component: CarComponent
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
    AboutComponent,
    NotfoundComponent,
    CarComponent
  ],
  // 3 配置路由模块
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
