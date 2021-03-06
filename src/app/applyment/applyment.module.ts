import { NgModule } from '@angular/core';
import { ApplymentComponent } from './applyment.component';
import { ApplymentRoutingModule } from './applyment-routing.module';
import { SearchAssessmentPageComponent } from './pages/search-assessment-page/search-assessment-page.component';
import { SearchAssessmentPageDirective } from './pages/search-assessment-page/search-assessment-page.directive';
import { InstructionsPageComponent } from './pages/instructions-page/instructions-page.component';
import { InstructionsModalComponent } from './pages/instructions-page/modal/instructions-modal.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ReviewModalComponent } from './pages/review-page/modal/review-modal.component';
import { CongratulationsPageComponent } from './pages/congratulations-page/congratulations-page.component';
import { CoreModule } from '../core/core.module';
import { StudentAuthenticationPageComponent } from './pages/student-authentication-page/student-authentication-page.component';
import { StudentAuthenticationPageDirective } from './pages/student-authentication-page/student-authentication-page.directive';
import { PageLogosComponent } from './shared/page-logos/page-logos.component';
import { NoConnectionModalComponent } from './shared/no-connection-modal/no-connection-modal.component';
import { ApplymentService } from './shared/applyment.service';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { ItemModule } from './item/item.module';

@NgModule({
  imports: [
    ApplymentRoutingModule,
    CoreModule,
    ItemModule
  ],
  declarations: [
    ApplymentComponent,
    StudentAuthenticationPageComponent,
    StudentAuthenticationPageDirective,
    SearchAssessmentPageComponent,
    SearchAssessmentPageDirective,
    InstructionsPageComponent,
    InstructionsModalComponent,
    QuestionPageComponent,
    ReviewPageComponent,
    CongratulationsPageComponent,
    PageLogosComponent,
    NoConnectionModalComponent,
    ReviewModalComponent,
    InstructionsModalComponent,
    ErrorModalComponent,
  ],
  entryComponents: [
    ReviewModalComponent,
    ErrorModalComponent
  ],
  exports: [
    ApplymentComponent,
    ItemModule,
  ],
  providers: [
    ApplymentService,
  ]
})
export class ApplymentModule {
}
