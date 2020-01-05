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
}
