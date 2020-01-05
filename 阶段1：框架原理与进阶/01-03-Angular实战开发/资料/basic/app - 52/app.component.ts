import { Component } from '@angular/core'

// 2 导入HttpClient
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 3 在组件中创建一个 http 属性
  constructor(private http: HttpClient) {}

  name: string

  getData() {
    // 发送get请求
    this.http.get('../assets/todos.json').subscribe((res: any) => {
      // console.log(res)
      this.name = res.name
    })
  }
}
