import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  // 任务列表
  todos = [
    { id: 1, name: '吃饭', done: true },
    { id: 2, name: '休息', done: false },
    { id: 3, name: '学习Angular', done: false }
  ]

  // 添加任务
  addTodo(todoName) {
    let id

    if (this.todos.length === 0) {
      id = 1
    } else {
      id = this.todos[this.todos.length - 1].id + 1
    }

    this.todos.push({
      id,
      name: todoName,
      done: false
    })
  }

  // 删除任务
  delTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  // 切换任务状态
  changeTodo(id) {
    const curTodo = this.todos.find(todo => todo.id === id)
    curTodo.done = !curTodo.done
  }

  ngOnInit() {}
}
