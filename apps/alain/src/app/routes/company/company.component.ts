import { Component, OnInit, OnDestroy } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { CompanyService } from '../../../../_mock/company.service'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  providers: [CompanyService],
})
export class CompanyComponent implements OnInit {
  // basic:  Object
  // data: Object
  // company: Object
  basic: any[] = []
  data: any[] = []
  company: any[] = []

  constructor(private companyService: CompanyService) {}

  getRequestContact() {
    this.companyService.getRequestContact().subscribe(
      res => {
        console.log(res)
        this.basic = res.basic
        this.data = res.data
        this.company = res.company
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnInit() {
    this.getRequestContact()
  }
}
