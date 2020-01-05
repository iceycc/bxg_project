import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// 1 导入HttpClient模块
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
