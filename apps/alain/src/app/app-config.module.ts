import { NgModule } from '@angular/core'
import { AuthConfigModule } from '@wushuu/module-alain-auth'
import { KpiConfigModule } from '@wushuu/module-alain-kpi'

@NgModule({
  imports: [
    // wushuu module
    AuthConfigModule,
    KpiConfigModule,
  ],
})
export class AppConfigModule {}
