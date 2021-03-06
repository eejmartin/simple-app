import {createAction, props} from "@ngrx/store";
import {User} from "../../shared/models/user";

export enum RegisterActionType {
  REGISTER_USER = '[REGISTER] Register User',
  REGISTRATION_SUCCESS = '[REGISTER] Registration Success',
  REGISTRATION_FAILURE = '[REGISTER] Registration Failure',
  CLEAR_REGISTER_FORM = '[REGISTER] Clear Register Form'
}

export const registerUser = createAction(
  RegisterActionType.REGISTER_USER,
  props<{ registerUser: User }>()
)

export const registrationSuccess = createAction(
  RegisterActionType.REGISTRATION_SUCCESS,
  props<{ user: User }>()
)

export const registrationFailure = createAction(
  RegisterActionType.REGISTRATION_FAILURE,
  props<{ error: any }>()
)

export const clearRegisterForm = createAction(
  RegisterActionType.CLEAR_REGISTER_FORM
)
