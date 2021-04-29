import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RegisterAction from '../actions/register.actions'
import {catchError, concatMap, switchMap} from "rxjs/operators";
import {UserService} from "../../shared/services/user/user.service";
import {of} from "rxjs";

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterAction.registerUser),
      concatMap((action) =>
        this.userService.register(action.registerUser).pipe(
          switchMap((user) => of(RegisterAction.registrationSuccess(user))),
          catchError((error) => of(RegisterAction.registrationFailure({error})))
        )
      )
    );
  });
}
