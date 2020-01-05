import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 任务列表
  todos = [
    { id: 1, name: '吃饭', done: true },
    { id: 2, name: '休息', done: false },
    { id: 3, name: '学习Angular', done: false }
  ]
  // 任务名称
  todoName = ''

  // trackBy方法
  trackByTodo(index, todo) {
    return todo.id
  }

  // 添加任务
  addTodo() {
    // 非空判断
    if (this.todoName.trim() === '') {
      return
    }

    let id

    if (this.todos.length === 0) {
      id = 1
    } else {
      id = this.todos[this.todos.length - 1].id + 1
    }

    // console.log('addTodo', this.todoName)
    this.todos.push({
      id,
      name: this.todoName,
      done: false
    })

    // 清空文本框
    this.todoName = ''
  }

  // 删除任务
  delTodo(e, id) {
    e.preventDefault()

    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  // 切换任务状态
  changeTodo(id) {
    // console.log('changeTodo', id)
    const curTodo = this.todos.find(todo => todo.id === id)

    curTodo.done = !curTodo.done
  }
}
