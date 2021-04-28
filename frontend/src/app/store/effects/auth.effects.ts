import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from "../../shared/services/auth/auth.service";
import * as AuthActions from "../actions/auth.actions";
import {catchError, concatMap, map, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logIn),
      concatMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((user) => {
            this.router.navigate(['']).finally();
            return AuthActions.loginSuccess({user: user})
          }),
          catchError((error) => of(AuthActions.loginFailure({error})))
        )
      )
    );
  });

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => {
        localStorage.removeItem('currentUser')
      }),
      concatMap((action) => {
          return of(AuthActions.loginFailure({'error': true}))
        }
      )
    );
  })
}
