import { OccupationRatingModel } from './../models/premium';
import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OccupationModel } from '../models/premium';

@Component({
  selector: 'app-premium-calculator',
  templateUrl: './premium-calculator.component.html',
  styleUrls: ['./premium-calculator.component.css']
})
export class PremiumCalculatorComponent implements OnInit {
  form: FormGroup;
  occupationList: OccupationModel[] = [];
  occupationRatingList: OccupationRatingModel[] = [];
  premiumTotal: number;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.form = fb.group({
      'name': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.required),
      'dateOfBirth': new FormControl('', Validators.required),
      'occupation': new FormControl('', Validators.required),
      'deathCoverAmount': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  calculatePremium() {

  }

}
