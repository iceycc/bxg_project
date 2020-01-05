import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// 1 导入路由模块
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

// 2 配置路由规则
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [AppComponent, HomeComponent],
  // 3 配置路由模块，作为根模块的依赖项
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
