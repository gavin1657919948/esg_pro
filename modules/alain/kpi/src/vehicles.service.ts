import { Injectable } from '@angular/core'
import { RoadVehicle_CN, SystemUserApi } from '@colmena/admin-lb-sdk'
export { RoadVehicle_CN } from '@colmena/admin-lb-sdk'
import { UiDataGridService, FormService } from '@wushuu/alain-ui'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

@Injectable()
export class VehiclesService extends UiDataGridService {
  public icon = 'icon-event'
  public title = 'Vehicles'
  public files: any[] = []
  public selectedEvent: RoadVehicle_CN

  public tableColumns = [{ field: 'name', label: 'Name', action: 'edit' }, { field: 'location', label: 'Location' }]
  private formService: any
  constructor(private userApi: SystemUserApi) {
    super()
    this.columns = this.tableColumns
  }

  setSelectedEvent(event: RoadVehicle_CN) {
    this.selectedEvent = event
  }

  getFormFields() {
    return [
      this.formService.input('name', {
        label: 'Name',
        placeholder: 'Name',
      }),
      this.formService.wysiwyg('description', {
        label: 'Description',
        placeholder: 'Description',
      }),
      this.formService.date('date', {
        label: 'Date',
      }),
      this.formService.input('location', {
        label: 'Location',
        placeholder: 'Location',
      }),
      this.formService.select('storageFileId', {
        label: 'File',
        options: this.files,
      }),
    ]
  }

  getFormConfig() {
    return {
      icon: this.icon,
      fields: this.getFormFields(),
      showCancel: true,
      hasHeader: false,
    }
  }

  getItems(): Observable<RoadVehicle_CN[]> {
    return this.userApi.getRoadVehicleCns(this.domain.id, this.getFilters({ include: ['storageFile'] }))
  }

  getItem(id): Observable<RoadVehicle_CN> {
    return this.userApi.findByIdContentEvents(this.domain.id, id)
  }

  getItemCount(): Observable<any> {
    return this.userApi.countRoadVehicleCns(this.domain.id, this.getWhereFilters())
  }

  upsertItem(item, successCb, errorCb): Subscription {
    if (item.id) {
      return this.upsertEvent(item, successCb, errorCb)
    }
    return this.createEvent(item, successCb, errorCb)
  }

  upsertEvent(item, successCb, errorCb): Subscription {
    return this.userApi.updateByIdContentEvents(this.domain.id, item.id, item).subscribe(successCb, errorCb)
  }

  createEvent(item, successCb, errorCb): Subscription {
    return this.userApi.createContentEvents(this.domain.id, item).subscribe(successCb, errorCb)
  }

  deleteItem(item, successCb, errorCb): Subscription {
    return this.userApi.destroyByIdContentEvents(this.domain.id, item.id).subscribe(successCb, errorCb)
  }
}
