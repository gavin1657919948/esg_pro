import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { KpiRoutingModule } from './kpi-routing.module'
import { FacilityListComponent } from './components/esg/facility-list.component'
//import { FacilityFormComponent } from './components/facility-form.component'
//import { FacilityDetailComponent } from './components/facility-detail.component'
import { EsgComponent } from './components/esg/esg.component'
import { VehicleListComponent } from './components/esg/vehicle-list.component'

import { HasKpiAccess } from './kpi.guards'
import { FacilitiesService } from './facilities.service'
import { FacilitiesResolver } from './facilities.resolvers'
import { VehiclesService } from './vehicles.service'
import { VehiclesResolver } from './vehicles.resolvers'

import { AlainUiModule } from '@wushuu/alain-ui'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [CommonModule, FormsModule, KpiRoutingModule, AlainUiModule, SharedModule.forRoot()],
  declarations: [
    FacilityListComponent,
    EsgComponent,
    VehicleListComponent,
    // FacilityFormComponent,
    // FacilityDetailComponent,
  ],
  providers: [HasKpiAccess, FacilitiesService, FacilitiesResolver, VehiclesService, VehiclesResolver],
})
export class KpiModule {}
