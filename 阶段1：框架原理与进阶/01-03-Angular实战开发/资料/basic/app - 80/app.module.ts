import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// 1 导入响应式表单模块
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  // 2 配置为当前模块的依赖项
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
