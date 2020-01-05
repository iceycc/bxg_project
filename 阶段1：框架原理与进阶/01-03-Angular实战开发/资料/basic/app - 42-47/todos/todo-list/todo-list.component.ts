import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

// 创建接口
interface Todo {
  id: number
  name: string
  done: boolean
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor() {}

  @Input()
  todos: Todo[]

  @Output()
  del = new EventEmitter<number>()

  @Output()
  change = new EventEmitter<number>()

  // trackBy方法
  trackByTodo(index: number, todo: Todo) {
    return todo.id
  }

  // 删除任务
  delTodo(e, id: number) {
    e.preventDefault()

    this.del.emit(id)
  }

  // 切换任务状态
  changeTodo(id: number) {
    this.change.emit(id)
  }

  ngOnInit() {}
}
