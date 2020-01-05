import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { Router } from '@angular/router'

@Injectable()
export class AuthInterceptors implements HttpInterceptor {
  constructor(private router: Router) {}

  // 拦截使用 HttpClient 方法的请求
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 如果是登录，不需要添加 Authorization
    if (req.headers.get('No-Auth') === 'TRUE') {
      return next.handle(req)
    }

    // 非登录请求，都要添加 Authorization

    const token = localStorage.getItem('itcast-token')

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })

    return next.handle(authReq).pipe(
      tap(
        // 成功的回调
        () => {},
        // 失败的回调
        error => {
          // console.log('捕获到一个错误：', error)
          if (error.status === 401) {
            localStorage.removeItem('itcast-token')

            this.router.navigate(['/login'])
          }
        }
      )
    )
  }
}
