import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {
  constructor() {}

  // 任务名称
  todoName = ''

  // 提供事件
  @Output()
  add = new EventEmitter<string>()

  // 添加任务
  addTodo() {
    // 非空判断
    if (this.todoName.trim() === '') {
      return
    }

    this.add.emit(this.todoName)

    // 清空文本框
    this.todoName = ''
  }

  ngOnInit() {}
}
