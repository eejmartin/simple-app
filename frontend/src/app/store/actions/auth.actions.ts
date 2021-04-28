import {createAction, props} from '@ngrx/store';
import {Credentials, User} from "../../shared/models/user";


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOG_OUT = '[Auth] Login Out',
}

export const logIn = createAction(
  AuthActionTypes.LOGIN,
  props<{ credentials: Credentials }>()
)

export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ user: User }>()
)

export const loginFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ error: any }>()
)

export const logOut = createAction(
  AuthActionTypes.LOG_OUT
)
