import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // template: '<div>内联模板</div>',

  // 演示插值表达式的使用：
  // template:
  //   '<div title="{{ company }}">{{ title }} --- {{ company + "666" }} -- {{ 1 + 2 + fn() }}</div>',

  // 演示属性绑定：
  // template: `
  //   <a [href]="url">a链接</a>
  //   <input type="checkbox" [checked]="isChecked" />
  // `,

  // // 演示事件绑定
  // template: `
  //   <button (click)="handleClick()" (mouseenter)="handleMouseEnter()">点我</button>
  //   <a [href]="url" (click)="handleClick($event)">传智播客</a>
  // `,

  // 演示双向数据绑定：
  // template: `
  //   <input type="text" [(ngModel)]="msg">
  //   <h1>{{ msg }}</h1>
  // `,

  // 演示Angular语言服务
  template: `
    <a [href]="url">传智播客</a>
    <button (click)="handleClick()">点我</button>
    <p>{{ user.name }}</p>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 数据
  title = '博学谷'
  company = '传智播客'
  url = 'http://itcast.cn/'
  isChecked = true

  // 双向绑定的数据
  msg = '文本框的默认值'

  // 演示语言服务
  user = {
    name: 'jack'
  }

  // 方法
  fn() {
    return '方法中返回的内容'
  }

  // 事件处理程序
  handleClick(e) {
    // 阻止浏览器的默认行为
    e.preventDefault()

    console.log('事件触发了', e)
  }
  handleMouseEnter() {
    console.log('鼠标移上来了')
  }
}
