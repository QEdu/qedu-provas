import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ConnectionService } from '../../services/connection.service';
import { By } from '@angular/platform-browser';
import { ApplymentService } from '../../../applyment/shared/applyment.service';
import { ApplymentModule } from '../../../applyment/applyment.module';
import { Student } from '../../../shared/model/student';

const db = require('../../../../../mock/db.json');
const studentStub = new Student();
studentStub.name = 'John Doe';
studentStub.matricula = '44256273';
studentStub.class = '197A';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let applyment: ApplymentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApplymentModule,
      ],
      providers: [
        ConnectionService,
        ApplymentService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Services
    applyment = fixture.debugElement.injector.get(ApplymentService);
    applyment.setStudent(studentStub);

    fixture.detectChanges();
  });

  it('should create', (() => {
    expect(component).toBeTruthy();
  }));

  it('should get getStudent data from service', () => {
    expect(component.student).toEqual(studentStub);
  });

  it('should display getStudent name', () => {
    const name = fixture.debugElement.query(By.css('[studentName]'));
    expect(name.nativeElement.textContent.trim()).toEqual(studentStub.name);
  });

  it('should display getStudent matricula', () => {
    const matricula = fixture.debugElement.query(By.css('[studentMatricula]'));
    expect(matricula.nativeElement.textContent.trim()).toEqual(studentStub.matricula);
  });

  it('should display getStudent class', () => {
    const klass = fixture.debugElement.query(By.css('[studentClass]'));
    expect(klass.nativeElement.textContent.trim()).toEqual(studentStub.class);
  });

});
