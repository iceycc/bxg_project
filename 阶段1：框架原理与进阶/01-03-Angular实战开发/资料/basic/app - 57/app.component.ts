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

  // 演示常用的请求 GET/POST/DELETE/PATCH
  // rest api

  // 接口地址
  url = 'http://localhost:3000/todos'

  // GET
  getData() {
    this.http.get(this.url).subscribe(res => {
      console.log(res)
    })
  }

  // POST
  addData() {
    this.http
      .post(this.url, {
        name: '测试添加',
        done: true
      })
      .subscribe(res => {
        console.log('POST成功：', res)
      })
  }

  // DELETE
  delData() {
    this.http.delete(`${this.url}/2`).subscribe(res => {
      console.log('DELETE 成功：', res)
    })
  }

  // PATCH
  updateData() {
    this.http
      .patch(`${this.url}/3`, {
        name: '好好学习 天天向上'
      })
      .subscribe(res => {
        console.log('PATCH 成功：', res)
      })
  }
}
