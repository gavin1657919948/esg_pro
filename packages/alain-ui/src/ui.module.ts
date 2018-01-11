import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { UiDataGridModule } from './components/data-grid/data-grid.module'

import { UiService } from './services/ui.service'
// import { FormService } from './services/form.service'

/**
 * Exported Modules
 * @type { Array }
 */
const modules = [UiDataGridModule]

/**
 * Exported Components
 * @type { Array }
 */
const components = []

/**
 * Exported Providers
 * @type { Array }
 */
const providers = [UiService]

/**
 * Exported Declarations
 * @type { Array }
 */
const declarations = []

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ...modules],
  declarations: [...declarations, ...components],
  exports: [CommonModule, ...declarations, ...modules, ...components],
})
export class AlainUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AlainUiModule,
      providers: [...providers],
    }
  }
}
