import { Injectable } from '@angular/core'

// 创建接口
// interface Todo {
//   id: number
//   name: string
//   done: boolean
// }
import { Todo } from './todo'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor() {}

  todos: Todo[]

  // 提供数据
  getTodos() {
    const todos: Todo[] = [
      { id: 1, name: '吃饭', done: true },
      { id: 2, name: '休息', done: false },
      { id: 3, name: '学习Angular', done: false },
      { id: 4, name: '学习TS', done: true }
    ]

    this.todos = todos
    return todos
  }

  // 添加数据
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

  // 切换任务状态
  changeTodo(id: number) {
    const curTodo = this.todos.find(todo => todo.id === id)

    curTodo.done = !curTodo.done
  }

  // 删除任务
  delTodo(id: number) {
    // this.todos = this.todos.filter(todo => todo.id !== id)

    // 为了不修改 this.todos 的指向，我们修改为另外一种
    // 实现方式
    const curIndex = this.todos.findIndex(todo => todo.id === id)
    this.todos.splice(curIndex, 1)
  }
}
