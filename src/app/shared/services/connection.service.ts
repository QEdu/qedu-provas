import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { mapTo, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class ConnectionService {
  status: Observable<boolean>;
  times = 0;
  interval = 500;
  limit = 0;
  private _reference = null;
  private _isFetching = false;
  private _fetching$ = new Subject<boolean>();

  get isFetching() {
    return this._isFetching;
  }

  constructor(private http: HttpClient) {
    this.status = this._fetching$.asObservable();
  }

  getStatusOnce(): Observable<boolean> {
    try {
      return this.http
        .get(`${API_URL}`)
        .pipe(mapTo(true), catchError(e => of(false)));
    } catch (err) {
      return of(false);
    }
  }

  startWatch(interval = 500, limit = 0): Observable<boolean> {
    if (this._isFetching) {
      throw new Error(
        'Already watching status. Stop the watching if you want to reinitialize.',
      );
    } else {
      this._isFetching = true;
      this.interval = interval;
      this.limit = limit;
      this.times = 0;
    }

    const request = () => {
      if (this.limit === 0 || this.times < this.limit) {
        this.times++;
        this.getStatusOnce().subscribe(status => {
          this._fetching$.next(status);
        });
      } else {
        this.stopWatch();
      }
    };

    request();
    this._reference = setInterval(request, this.interval);

    return this.status;
  }

  stopWatch() {
    clearInterval(this._reference);
    this._isFetching = false;
  }
}
