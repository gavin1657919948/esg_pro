import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { UiDataGridComponent } from './data-grid.component'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule.forRoot()],
  declarations: [UiDataGridComponent],
  providers: [],
  exports: [UiDataGridComponent],
})
export class UiDataGridModule {}
