import { Component } from '@angular/core'

// 2 导入HttpClient
import { HttpClient } from '@angular/common/http'

interface Todo {
  name: string
  description: string
}

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
    // this.http.get<Todo>('../assets/todos.json').subscribe(res => {
    //   // console.log(res)
    //   this.name = res.name
    // })

    // this.http.get('../assets/todos.json').subscribe((res: Todo) => {
    //   // console.log(res)
    //   this.name = res.name
    // })

    this.http.get<Todo>('../assets/todos.json').subscribe((res: Todo) => {
      // console.log(res)
      this.name = res.name
    })
  }
}
