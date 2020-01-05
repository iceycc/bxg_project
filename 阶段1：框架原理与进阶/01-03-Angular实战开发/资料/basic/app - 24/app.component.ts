import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 数据
  colors = ['red', 'green', 'blue', 'pink']

  fetchData() {
    setTimeout(() => {
      this.colors = ['red', 'green', 'blue666', 'pink']
    }, 500)
  }

  /* colors = [
    { id: 1, name: 'red' },
    { id: 2, name: 'green' },
    { id: 3, name: 'blue' }
  ]

  fetchColors() {
    setTimeout(() => {
      this.colors = [
        { id: 1, name: 'red' },
        { id: 2, name: 'green 666' },
        { id: 3, name: 'blue' }
      ]
    }, 500)
  }

  trackById(index, color) {
    return color.id
  } */
}
