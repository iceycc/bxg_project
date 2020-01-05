import { Injectable } from '@angular/core'

// 导入HttpClient
import { HttpClient } from '@angular/common/http'
// 导入URL
import { URL } from '../config'

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {}

  // 退出
  logout() {
    // const token = localStorage.getItem('itcast-token')

    return this.http.delete(`${URL}/tokens`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
  }
}
