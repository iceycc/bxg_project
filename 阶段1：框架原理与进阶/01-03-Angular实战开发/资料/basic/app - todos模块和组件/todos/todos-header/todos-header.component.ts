import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-todos-header',
  templateUrl: './todos-header.component.html',
  styleUrls: ['./todos-header.component.css']
})
export class TodosHeaderComponent implements OnInit {
  constructor() {}
  // 任务名称
  todoName = ''

  @Output()
  add = new EventEmitter()

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
