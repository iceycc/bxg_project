import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor() {}

  @Input()
  todos

  @Output()
  del = new EventEmitter()

  @Output()
  change = new EventEmitter()

  // trackBy方法
  trackByTodo(index, todo) {
    return todo.id
  }

  // 删除任务
  delTodo(e, id) {
    e.preventDefault()

    this.del.emit(id)
  }

  // 切换任务状态
  changeTodo(id) {
    this.change.emit(id)
  }

  ngOnInit() {}
}
