import { OccupationModel, OccupationRatingModel } from './../models/premium';
import { CommonService } from './../services/common.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PremiumCalculatorComponent } from './premium-calculator.component';
import { MatButtonModule, MatInputModule, MatSnackBarModule, MatSelectModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';

describe('PremiumCalculatorComponent', () => {
  let component: PremiumCalculatorComponent;
  let fixture: ComponentFixture<PremiumCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule
      ],
      declarations: [
        PremiumCalculatorComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        CommonService,
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCalculatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 5 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('age')).toBeTruthy();
    expect(component.form.contains('dateOfBirth')).toBeTruthy();
    expect(component.form.contains('occupation')).toBeTruthy();
    expect(component.form.contains('deathCoverAmount')).toBeTruthy();
  });

  it('shoud make the name control required', () => {
    const control = component.form.get('name');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('shoud make the age control required', () => {
    const control = component.form.get('age');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('shoud make the dateOfBirth control required', () => {
    const control = component.form.get('dateOfBirth');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('shoud make the occupation control required', () => {
    const control = component.form.get('occupation');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('shoud make the deathCoverAmount control required', () => {
    const control = component.form.get('deathCoverAmount');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should load the occupation list from the service', () => {
    const list = [
      {
        occupation: 'TestOp1',
        rating: 'TestRating1'
      },
      {
        occupation: 'TestOp2',
        rating: 'TestRating2'
      }
    ] as OccupationModel[];
    const service = TestBed.get(CommonService);
    spyOn(service, 'getOccupationList').and.returnValue(from([ list ]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.occupationList).toBe(list);
  });

  it('should load the occupation rating list from the service', () => {
    const ratingList = [
      {
        rating: 'TestRating1',
        factor: 1.2
      },
      {
        rating: 'TestRating2',
        factor: 1.8
      }
    ] as OccupationRatingModel[];
    const service = TestBed.get(CommonService);
    spyOn(service, 'getOccupationRatingList').and.returnValue(from([ ratingList ]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.occupationRatingList).toBe(ratingList);
  });

  it('should calculate the premium total and greater than 0', () => {
    const testModel = {
      name: 'John Doe',
      age: 30,
      dateOfBirth: '01/01/1990',
      occupation: 'Author',
      deathCoverAmount: 10000
    };

    component.form.controls['name'].setValue(testModel.name);
    component.form.controls['age'].setValue(testModel.age);
    component.form.controls['dateOfBirth'].setValue(testModel.dateOfBirth);
    component.form.controls['occupation'].setValue(testModel.occupation);
    component.form.controls['deathCoverAmount'].setValue(testModel.deathCoverAmount);

    component.calculatePremium();
    fixture.detectChanges();

    expect(component.premiumTotal).toBeGreaterThan(0);
  });
});
