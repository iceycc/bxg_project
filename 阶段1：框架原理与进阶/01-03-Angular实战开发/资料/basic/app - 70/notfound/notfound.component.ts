import { Component, OnInit } from '@angular/core'

// 导入路由提供的服务
import { Router } from '@angular/router'

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  constructor(private router: Router) {}

  time = 5

  ngOnInit() {
    const timerId = setInterval(() => {
      this.time--
      // console.log(this.time)
      if (this.time === 0) {
        clearInterval(timerId)
        // 使用编程式导航来实现跳转
        this.router.navigate(['/home'])
      }
    }, 1000)
  }
}
