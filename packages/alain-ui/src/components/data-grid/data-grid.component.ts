import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Component({
  selector: 'ui-data-grid',
  templateUrl: './data-grid.component.html',
})
export class UiDataGridComponent implements OnInit {
  @Input() limit = 20

  @Input() config: any = {}

  @Input() service: any
  @Output() action = new EventEmitter()

  public items: any[] = []

  public totalItems
  public currentPage: any = 1

  public columns = []
  public columnSorting = {}
  loading = false

  private refresh$ = new BehaviorSubject(null)
  isVisible = false
  item

  public refreshData() {
    this.columns = this.service.columns
    this.columnSorting = this.service.columnSorting
    this.limit = this.service.limit
    this.refresh$.next(null)
  }

  ngOnInit() {
    this.service.limit = this.limit
    this.columns = this.service.columns
    this.columnSorting = this.service.columnSorting
    console.log('UiDataGridComponent.ngOnInit() this.columns=', this.columns)

    this.refresh$.switchMap(e => this.service.getItems()).subscribe((res: any[]) => (this.items = res))
    this.refresh$.switchMap(e => this.service.getItemCount()).subscribe((res: any) => (this.totalItems = res.count))

    if (!this.config.header) {
      this.config.header = {
        buttons: [{ action: 'add', icon: 'icon-plus', classNames: 'btn btn-outline-success' }],
      }
    }
  }

  searchAction(query) {
    this.service.search = query
    this.refreshData()
  }

  setOrder(event) {
    this.service.order = event
    this.refreshData()
  }

  setLimit(limit) {
    this.service.limit = limit
    this.refreshData()
  }

  setOffsetLimit($event) {
    this.service.offset = $event.offset
    this.service.limit = $event.limit
    this.refreshData()
  }

  gridAction(event) {
    switch (event.action) {
      case 'limit':
        return this.setLimit(event.item)
      case 'sort':
        return this.setOrder(event.item)
      case 'offset':
        return this.setOffsetLimit(event.item)
      case 'search':
        return this.searchAction(event.item)
      case 'refresh':
        return this.refreshData()
      case 'delete':
        this.isVisible = true
        this.item = event.item
        return
      default:
        return this.action.emit(event)
    }
  }

  pageChange(pi: number): Promise<any> {
    this.service.offset = (pi - 1) * this.service.limit
    this.refreshData()
    this.loading = true
    return new Promise(resolve => {
      setTimeout(() => {
        this.loading = false
        resolve()
      }, 500)
    })
  }

  dataChange(res: any) {
    console.log('UiDataGridComponent.dataChange() res=', res)
  }
  pageSizeChange() {
    console.log('new pageSize=', this.limit)
    this.service.limit = this.limit
    this.refreshData()
  }

  clickItem($event, action, item) {
    $event.preventDefault()
    this.gridAction({ action, item })
  }

  handleCancel(event) {
    this.isVisible = false
  }
  handleOk(event) {
    this.isVisible = false
    this.action.emit({ action: 'delete', item: this.item })
  }
}
