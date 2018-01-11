import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HasKpiAccess } from './kpi.guards'

import { EsgComponent } from './components/esg/esg.component'
import { FacilityListComponent } from './components/esg/facility-list.component'
import { VehicleListComponent } from './components/esg/vehicle-list.component'
// import { FacilityFormComponent } from './components/esg/facility-form.component'
// import { FacilityDetailComponent } from './components/esg/facility-detail.component'

import { FacilitiesResolver } from './facilities.resolvers'

export const routes: Routes = [
  {
    path: '',
    canActivate: [HasKpiAccess],
    children: [
      {
        path: 'esg',
        data: {
          title: 'kpi',
        },
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          {
            path: 'overview',
            component: EsgComponent,
            data: {
              title: 'overview',
            },
          },
          {
            path: 'vehicles',
            data: { title: 'Vehicles' },
            children: [
              { path: '', redirectTo: 'list', pathMatch: 'full' },
              {
                path: 'list',
                component: VehicleListComponent,
                data: { title: 'List' },
              },
            ],
          },
          {
            path: 'facilities',
            data: { title: 'Facilities' },
            children: [
              { path: '', redirectTo: 'list', pathMatch: 'full' },
              {
                path: 'list',
                component: FacilityListComponent,
                data: { title: 'List' },
              },
              // {
              //   path: 'create',
              //   component: FacilityDetailComponent,
              //   data: { title: 'Create' },
              //   children: [
              //     {
              //       path: '',
              //       component: FacilityFormComponent,
              //     },
              //   ],
              // },
              // {
              //   path: ':id',
              //   component: FacilityDetailComponent,
              //   resolve: {
              //     facility: FacilitiesResolver,
              //   },
              //   data: { title: 'Edit' },
              //   children: [
              //     { path: '', redirectTo: 'edit', pathMatch: 'full' },
              //     {
              //       path: 'edit',
              //       component: FacilityFormComponent,
              //       data: { title: 'Edit' },
              //     },
              //   ],
              // },
            ],
          },
        ],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpiRoutingModule {}
