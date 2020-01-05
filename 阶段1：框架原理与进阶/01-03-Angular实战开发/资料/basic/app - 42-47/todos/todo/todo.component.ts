import { Component, OnInit, OnChanges } from '@angular/core'

// 创建接口
interface Todo {
  id: number
  name: string
  done: boolean
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {
  constructor() {}

  // 任务列表
  todos: Todo[] = [
    { id: 1, name: '吃饭', done: true },
    { id: 2, name: '休息', done: false },
    { id: 3, name: '学习Angular', done: false }
  ]

  // 父组件完成数据添加操作
  addTodo(todoName: string) {
    // 类型注解
    let id: number

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
  delTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  // 切换任务状态
  changeTodo(id: number) {
    // console.log('changeTodo', id)
    const curTodo = this.todos.find(todo => todo.id === id)

    curTodo.done = !curTodo.done
  }

  ngOnInit() {}

  ngOnChanges() {}
}
