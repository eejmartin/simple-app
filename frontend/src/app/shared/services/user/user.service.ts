import {Injectable} from "@angular/core";
import {ApiService} from "../api/api.service";
import {User} from "../../models/user";
import {Observable, of, throwError, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {
  }

  register(registerUser: User): Observable<any> {
    return this.apiService.post('users/register', registerUser).pipe(map((res) => {
      if (res) {
        return of(res.data);
      } else {
        return throwError('Unable to login!');
      }
    }))
  }
}
