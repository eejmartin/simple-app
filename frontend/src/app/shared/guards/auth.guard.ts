import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store";
import {authFeatureKey} from "../../store/reducers/auth.reducers";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  loadUser(): Observable<any> {
    return this.store.select(state => state[authFeatureKey].isAuthenticated);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loadUser()
      .pipe(switchMap((isAuth) => {
        if ((state.url == '/login' || state.url == '/register') && !isAuth) {
          return of(true);
        }
        if (!isAuth) {
          this.router.navigate(['login']).finally();
          return of(isAuth);
        }
        return of(isAuth);
      }));
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loadUser()
      .pipe(switchMap((isAuth) => {
        return of(isAuth);
      }));
  }
}
