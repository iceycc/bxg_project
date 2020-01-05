import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
// 1. 引入Routes 及 RouterModule类
// Routes是一个表示路由配置的数组
// RouterModule用于添加路由器的指令和服务
import { Routes, RouterModule } from '@angular/router'
// 引入HttpClientModule
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { DatabindComponent } from './databind/databind.component';
import { DirectivecomComponent } from './directivecom/directivecom.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { HttpComponent } from './http/http.component';
import { MovielistComponent } from './movielist/movielist.component';
import { MoviedetailComponent } from './moviedetail/moviedetail.component';

// 2. 添加路由定义
// path: 一个用于匹配浏览器地址栏中URL的字符串。注意字符串前面不能加 /
// component: 匹配path所对应的组件

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: 'detail/:id', component: UserdetailComponent }
    ]
  },
  { path: 'http', component: HttpComponent},
  // 路由参数的定义通过   冒号 + 参数名
  // {path: 'detail/:id', component: UserdetailComponent}


  // redirectTo表示重定向，路径是一个绝对路径，pathMatch: 'full'表示精确匹配
  { path: '', redirectTo: '/movie/in_theaters', pathMatch: 'full'},
  { path: 'movie/:type', component: MovielistComponent },
  { path: 'movie/:type/:id', component: MoviedetailComponent}
]

// @NgModule利用一个元数据对象来告诉Angular如何去编译和运行代码
@NgModule({
  // 声明模块内部成员：组件、指令、管道
  declarations: [
    AppComponent,
    TestComponent,
    DatabindComponent,
    DirectivecomComponent,
    HomeComponent,
    UsersComponent,
    UserdetailComponent,
    HttpComponent,
    MovielistComponent,
    MoviedetailComponent
  ],
  // 导入其他模块
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    FormsModule,
    // 3. 初始化路由器。forRoot()方法会提供路由所需的服务和指令，并且基于浏览器当前的URL执行首次导航
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  // 指定应用程序需要使用的服务
  providers: [],
  // 设置app启动的根组件，通常只有一个根组件
  bootstrap: [AppComponent]
})
export class AppModule { }
