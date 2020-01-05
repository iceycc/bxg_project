import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// 导入HttpClientModule
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

import { TodosModule } from './todos/todos.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TodosModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
