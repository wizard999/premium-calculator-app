import { OccupationRatingModel } from './../models/premium';
import { CommonService } from './../services/common.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OccupationModel } from '../models/premium';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-premium-calculator',
  templateUrl: './premium-calculator.component.html',
  styleUrls: ['./premium-calculator.component.css']
})
export class PremiumCalculatorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  occupationList: OccupationModel[] = [];
  occupationRatingList: OccupationRatingModel[] = [];
  premiumTotal: number;
  selectedFactor: number;

  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      'name': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.required),
      'dateOfBirth': new FormControl('', Validators.required),
      'occupation': new FormControl('', Validators.required),
      'deathCoverAmount': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.commonService.getOccupationList().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value: OccupationModel[]) => {
      this.occupationList = value;

      // get the occupation rating list and mapping the factor
      this.getOccupationRatingFactor();
    },
    (error: any) => {
      console.error(error);
    });
  }

  getOccupationRatingFactor() {
    this.commonService.getOccupationRatingList().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value: OccupationRatingModel[]) => {
      this.occupationRatingList = value;

      if (this.occupationRatingList.length) {
        this.occupationList.map(item => {
          item.factor = this.occupationRatingList.filter(x => x.rating === item.rating)[0].factor;
        });
      }

    },
    (error: any) => {
      console.error(error);
    });
  }

  calculatePremium() {
    if (this.form.invalid) {
      const message = 'Please fill the missing fields.';

      this.snackBar.open(message, '', {
          duration: 2000,
      });

      return;
    }

    const age = this.form.get('age').value;
    const deathCoverAmount = this.form.get('deathCoverAmount').value;

    this.premiumTotal = this.commonService.calculatePremium(deathCoverAmount, this.selectedFactor, age);
  }

  onOccupationChange() {
     if (this.form.valid) { this.calculatePremium(); }
  }

  setSelectedFactor(factor: number) {
    this.selectedFactor = factor;
  }

  ngOnDestroy() {
     this.ngUnsubscribe.next();
     this.ngUnsubscribe.complete();
  }

}
