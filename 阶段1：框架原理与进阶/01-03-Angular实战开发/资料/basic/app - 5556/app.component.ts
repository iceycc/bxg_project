import { Component } from '@angular/core'

// 2 导入HttpClient
import { HttpClient, HttpResponse } from '@angular/common/http'

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
    // 演示获取完整的Http响应
    // this.http
    //   .get('../assets/todos.json', { observe: 'response' })
    //   .subscribe(res => {
    //     // console.log(res)
    //     console.log(res.headers.get('content-type'), res.body)
    //   })

    // this.http
    //   .get<Todo>('../assets/todos.json', { observe: 'response' })
    //   .subscribe(res => {
    //     // console.log(res)
    //     console.log(res.headers.get('content-type'), res.body)
    //   })

    // this.http
    //   .get('../assets/todos.json', { observe: 'response' })
    //   .subscribe((res: HttpResponse<Todo>) => {
    //     // console.log(res)
    //     console.log(res.headers.get('content-type'), res.body)
    //   })

    this.http
      .get<Todo>('../assets/todos.json', { observe: 'response' })
      .subscribe((res: HttpResponse<Todo>) => {
        // console.log(res)
        console.log(res.headers.get('content-type'), res.body)

        this.name = res.body.name
      })
  }
}
