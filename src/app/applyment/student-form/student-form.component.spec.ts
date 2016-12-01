///<reference path="../../../../node_modules/@angular/core/testing/fake_async.d.ts"/>
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterStub } from '../../../testing/router-stub';
import { SharedModule } from '../../shared/shared.module';
import { StudentFormComponent } from "./student-form.component";
import { Assessment } from "../../shared/model/assessment";

import { ASSESSMENTS } from "../../shared/mock/assessment-mock";
import { setInputValue } from "../../../testing/form-helper";
import { ActivatedRouteStub } from "../../../testing/activated-route-stub";


describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let routerService: Router;
  let assessment: Assessment;
  let route = new ActivatedRouteStub();


  beforeEach(async(() => {
    assessment = ASSESSMENTS[0];
    route.testParams = { uuid: assessment.uuid };

    TestBed.configureTestingModule({
             imports: [SharedModule],
             declarations: [StudentFormComponent],
             providers: [
               { provide: Router, useValue: new RouterStub() },
               { provide: ActivatedRoute, useValue: route }
             ]
           })
           .compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    routerService = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the assessment title', () => {
    let title = fixture.debugElement.query(By.css('.title')).nativeElement.textContent;
    expect(title).toEqual(assessment.title);
  });

  it('should navigate to instructions when has no errors', () => {
    spyOn(routerService, 'navigate');

    setInputValue(fixture, '#name', 'John Doe');
    component.onSubmit();

    expect(routerService.navigate).toHaveBeenCalledWith(['prova', assessment.uuid,'instructions']);

  });

  describe('Form validation', () => {
    it('should display form validation errors', () => {
      let nameControl = component.form.get('name');

      expect(nameControl.errors).toEqual({ required: true });

      setInputValue(fixture, '#name', 'renan');
      expect(nameControl.errors).toBe(null);

      setInputValue(fixture, '#name', '');
      fixture.detectChanges();

      let nameErrorMessages = fixture.debugElement.query(By.css('.name_errors span')).nativeElement;
      expect(nameControl.errors).toEqual({ required: true });
      expect(nameErrorMessages.textContent).toEqual('Campo obrigatório');

      setInputValue(fixture, '#name', 'renan@azevedo1');
      fixture.detectChanges();

      nameErrorMessages = fixture.debugElement.query(By.css('.name_errors span')).nativeElement;
      expect(nameErrorMessages.textContent).toEqual('Caracteres inválidos: @1');
    });
  });
});
