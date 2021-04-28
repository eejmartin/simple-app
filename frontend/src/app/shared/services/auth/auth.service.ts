import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {Credentials} from "../../models/user";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {
  }

  login(credentials: Credentials): Observable<any> {
    return this.apiService.post('login', credentials).pipe(
      map(res => {
        if (res.access_token) {
          // this.cookieService.set('token', res.data.jwt_token);
          localStorage.setItem('currentUser', JSON.stringify(res.access_token));
          return of(res.user);
        } else {
          return throwError('Unable to login!');
        }
      })
    );
  }
}
