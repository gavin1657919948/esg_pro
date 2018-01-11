import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { RoadVehicle_CN, VehiclesService } from './vehicles.service'

@Injectable()
export class VehiclesResolver implements Resolve<RoadVehicle_CN> {
  constructor(private service: VehiclesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoadVehicle_CN> {
    return this.service.getItem(route.params.id)
  }
}
