import { NgModule } from '@angular/core'
import { Store } from '@ngrx/store'

const moduleName = 'kpi'

const link = (...links) => ['/', moduleName, ...links]

const moduleConfig = {
  name: 'Kpi',
  icon: 'icon-wrench',
  packageName: `@colmena/module-admin-${moduleName}`,
}
@NgModule()
export class KpiConfigModule {
  constructor(protected store: Store<any>) {
    this.store.dispatch({ type: 'APP_LOAD_MODULE', payload: { moduleName, moduleConfig } })
  }
}
