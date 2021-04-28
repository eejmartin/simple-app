import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {NgForm} from "@angular/forms";
import {User} from "../../../shared/models/user";
import * as formRegisterActions from '../../../store/actions/register.actions'
import {Observable, of} from "rxjs";
import {registerFeatureKey} from "../../../store/reducers/register.reducers";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f', {static: true}) private registerForm?: NgForm;
  private storeFormData$?: Observable<unknown>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.storeFormData$ = this.store.select(state => state[registerFeatureKey].isRegister).pipe(
      switchMap((isRegister) => {
        if (isRegister) {
          this.registerForm?.resetForm();
          this.store.dispatch(formRegisterActions.clearRegisterForm());
        }
        return of(isRegister);
      })
    )
  }

  onSubmit(f: NgForm): void {
    const registerUser = new User();
    registerUser.userName = f.value.username;
    registerUser.firstName = f.value.firstName;
    registerUser.lastName = f.value.lastName;
    registerUser.email = f.value.email;
    registerUser.password = f.value.password;
    this.store.dispatch(formRegisterActions.registerUser({registerUser}));
    this.storeFormData$?.subscribe(data => {
    });
  }

}
