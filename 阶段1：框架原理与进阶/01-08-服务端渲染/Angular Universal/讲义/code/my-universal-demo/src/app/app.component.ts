import { Component } from '@angular/core';

// @Component利用元数据对象定义一个组件
@Component({
  // selector就是css选择器，它会告诉Angular，一旦在模板html中找到这个选择器对应的标签，就创建并插入该组件的一个实例
  selector: 'app-root',
  // templateUrl指定组件模板的位置
  templateUrl: './app.component.html',
  // styleUrls指定组件样式的位置
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-universal-demo';
}
