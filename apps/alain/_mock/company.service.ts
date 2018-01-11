import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class CompanyService {
  constructor(private http: Http) {}

  // 本地json文件请求
  getRequestContact() {
    return this.http.get('/assets/company.json').map(res => res.json())
  }
}
