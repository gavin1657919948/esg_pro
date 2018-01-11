import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'

@Injectable()
export class HasKpiAccess implements CanActivate {
  private ui: any
  constructor(private store: Store<any>) {}

  public canActivate(): Observable<boolean> {
    return this.store
      .select('auth')
      .map((res: any) => res.roles.assigned)
      .map((roles: any) => {
        if (roles.includes('system-admin')) {
          //TODO change role
          return true
        }
        this.ui.alerts.notifyError({
          title: 'Access Denied',
          body: 'Your assigned roles do not allow access.',
        })
        return false
      })
      .take(1)
  }
}
