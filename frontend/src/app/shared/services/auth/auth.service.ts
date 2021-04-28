import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {from, observable, Observable, of, throwError} from "rxjs";
import {Credentials, User} from "../../models/user";
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
          localStorage.setItem('token', JSON.stringify(res.access_token));
          localStorage.setItem('user', JSON.stringify(res.user));
          return of(res.user);
        } else {
          return throwError('Unable to login!');
        }
      })
    );
  }

  logOut(): Observable<any> {
    return new Observable<any>((observer) => {
      localStorage.clear()
      return observer.next(true);
    })
  }

  loadLocalStorageUser(): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    return of(currentUser)
  }
}
