import { Component, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UiService } from '@wushuu/alain-ui'
import { SystemUserApi } from '@colmena/admin-lb-sdk'
import { VehiclesService } from '../../vehicles.service'

@Component({
  selector: 'app-kpi-esg-vehicle-list',
  template: `
  <pro-header [title]="'道路移动源查询表格'"></pro-header>
  <nz-card [nzBordered]="false">
    <ui-data-grid #grid (action)="action($event)" [service]="service"></ui-data-grid>
  </nz-card>
  `,
})
export class VehicleListComponent {
  @ViewChild('grid') private grid

  constructor(
    public service: VehiclesService,
    private ui: UiService,
    private router: Router,
    private userApi: SystemUserApi,
    private route: ActivatedRoute
  ) {
    this.service.domain = { id: userApi.getCurrentId() }
  }

  action(event) {
    switch (event.action) {
      case 'edit':
        return this.router.navigate([event.item.id], {
          relativeTo: this.route.parent,
        })
      case 'add':
        return this.router.navigate(['create'], {
          relativeTo: this.route.parent,
        })
      case 'delete':
        // TODO
        // const successCb = () =>
        //   this.service.deleteItem(
        //     event.item,
        //     () => this.grid.refreshData(),
        //     err => this.ui.msg.blank('Error Deleting item', err.message)
        //   )
        // const question = {
        //   title: 'Are You Sure?',
        //   text: 'The action can not be undone.',
        // }
        // return this.ui.msg.alertQuestion(question, successCb, () => ({}))
        return
      default:
        return console.log('Unknown Event Action', event)
    }
  }
}
