import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RegisterAction from '../actions/register.actions'
import {Router} from "@angular/router";
import {catchError, concatMap, map} from "rxjs/operators";
import {UserService} from "../../shared/services/user/user.service";
import * as AuthActions from "../actions/auth.actions";
import {of} from "rxjs";

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {
  }

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterAction.registerUser),
      concatMap((action) =>
        this.userService.register(action.registerUser).pipe(
          map((user) => {
            this.router.navigate(['login']).finally();
            return RegisterAction.registrationSuccess(user);
          }),
          catchError((error) => of(AuthActions.loginFailure({error})))
        )
      )
    );
  });
}
