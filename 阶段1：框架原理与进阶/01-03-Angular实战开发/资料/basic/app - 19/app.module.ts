import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// 导入表单模块，实现双向数据绑定
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
