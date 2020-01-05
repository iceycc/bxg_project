import { Component, OnInit } from '@angular/core'

// 导入路由服务
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  cars = [
    { id: 1, name: '布佳迪', desc: '豪车豪车' },
    { id: 2, name: '法拉利', desc: '也是豪车，反正买不起' },
    { id: 3, name: '兰博基尼', desc: '看车标都很牛' },
    { id: 6, name: '比亚迪', desc: '国产车的骄傲！！！' }
  ]

  curCar

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      // console.log('路由参数为：', param)
      const id = param.get('id')
      // console.log('路由参数为：', id)
      this.curCar = this.cars.find(car => car.id === +id)
    })
  }
}
