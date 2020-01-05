import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 数据
  classList = {
    redColor: false,
    fz: true
  }

  isTest = false

  stylesList = {
    color: 'red',
    fontSize: '50px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }

  fz = '60px'
}
