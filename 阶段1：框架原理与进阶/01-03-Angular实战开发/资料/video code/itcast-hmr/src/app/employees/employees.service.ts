import { Injectable } from '@angular/core'

// 导入HttpClient
import { HttpClient } from '@angular/common/http'
// 导入配置
import { URL } from '../config'
// 导入接口
import { Employee } from './employee.type'

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  // 获取数据
  fetchData(curPage: number, pageSize) {
    // const token = localStorage.getItem('itcast-token')
    const employeeUrl = `${URL}/employees?_page=${curPage}&_limit=${pageSize}`

    return this.http.get<Employee[]>(employeeUrl, {
      // 传入参数获取完整响应体
      observe: 'response'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
  }

  // 删除数据
  delEmployee(id: number) {
    // const token = localStorage.getItem('itcast-token')

    return this.http.delete(`${URL}/employees/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
  }

  // 添加员工
  addEmployee(employee: Employee) {
    return this.http.post(`${URL}/employees`, employee)
  }

  // 根据id查询员工信息
  getEmployeeById(id: number) {
    return this.http.get<Employee>(`${URL}/employees/${id}`)
  }

  // 根据员工id更新员工
  updateEmployeeById(id: number, params: Employee) {
    return this.http.patch<Employee>(`${URL}/employees/${id}`, params)
  }
}
