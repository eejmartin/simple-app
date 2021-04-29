import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Observable, of} from "rxjs";

@Injectable()
export class CookieJwtService {
  constructor(
    private cookieService: CookieService
  ) {
  }

  getItem(): Observable<string | null> {
    const data = this.cookieService.get('token');
    if (data) {
      return of(data);
    }
    return of(null);
  }
}
