import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { OccupationModel, OccupationRatingModel } from '../models/premium';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  getOccupationList(): Observable<OccupationModel[]> {
     return this.http.get<OccupationModel[]>('assets/occupation-list-data.json')
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
  }

  getOccupationRatingList(): Observable<OccupationRatingModel[]> {
    return this.http.get<OccupationRatingModel[]>('assets/occupation-rating-data.json')
       .pipe(
         retry(1),
         catchError(this.handleError)
       );
 }


  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-Side Error: ${error.error.message}`;
    } else {
      errorMessage = `Server-Side Error: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
