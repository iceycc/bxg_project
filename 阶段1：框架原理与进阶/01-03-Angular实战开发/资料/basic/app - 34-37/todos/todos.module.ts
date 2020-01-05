import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { TodoComponent } from './todo/todo.component'
import { TodoHeaderComponent } from './todo-header/todo-header.component'
import { TodoListComponent } from './todo-list/todo-list.component'

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TodoComponent, TodoHeaderComponent, TodoListComponent],
  // 将 todo 模块导出
  exports: [TodoComponent]
})
export class TodosModule {}
