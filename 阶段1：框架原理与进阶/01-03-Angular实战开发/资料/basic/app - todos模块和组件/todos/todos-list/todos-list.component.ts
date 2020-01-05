import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  constructor() {}

  // 我公开一个 todos 属性，我允许你通过该属性将数据传递给我
  @Input()
  todos

  // 子组件暴露一个 EventEmitter 属性，当事件发生时，子组件利用该属性 emits(向上弹射)事件。父组件绑定到这个事件属性，并在事件发生时作出回应。
  // 子组件公开一个事件触发器，父组件将一个方法绑定到这个事件触发器中
  // 当子组件触发这个事件触发器，父组件中的方法就会被调用执行
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
