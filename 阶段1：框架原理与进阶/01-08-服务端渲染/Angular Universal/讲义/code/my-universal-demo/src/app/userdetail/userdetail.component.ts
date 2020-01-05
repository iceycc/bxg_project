import { Component, OnInit } from '@angular/core';
// ActivatedRoute表示当前组件的路由信息
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  id: number = -1

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // 注意，使用路由快照获取路由参数，只会获取一次
    // this.id = this.route.snapshot.params['id']

    // 使用路由订阅获取路由参数。使用路由订阅的好处是可以监听到路由参数的变化
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
  }

}
