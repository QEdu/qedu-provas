import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationComponent } from './validation.component';
import { MatrixSearchPageComponent } from './pages/matrix-search-page/matrix-search-page.component';

const routes: Routes = [
  {
    path: 'validacao', component: ValidationComponent,
    children: [
      { path: '', component: MatrixSearchPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationRoutingModule {
}
