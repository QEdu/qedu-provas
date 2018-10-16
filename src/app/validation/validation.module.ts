import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';
import { MatrixSearchPageComponent } from './matrix-search-page/matrix-search-page.component';
import { MatrixInfoComponent } from './matrix-search-page/matrix-info/matrix-info.component';

@NgModule({
  imports: [SharedModule, ValidationRoutingModule],
  declarations: [
    ValidationComponent,
    MatrixSearchPageComponent,
    MatrixInfoComponent,
  ],
})
export class ValidationModule {}
