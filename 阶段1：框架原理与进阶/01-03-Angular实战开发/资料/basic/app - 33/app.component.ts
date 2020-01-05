import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  msg = ''

  // 2 提供方法
  giveMoney(data) {
    console.log('父组件中的方法调用了', data)

    this.msg = data
  }
}
