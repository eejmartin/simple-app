import {User} from "../../shared/models/user";
import {createReducer, on} from "@ngrx/store";
import * as RegisterAction from "../actions/register.actions";

export const registerFeatureKey = 'register';

export const initialRegisterState: RegisterState = {
  isRegister: false,
  user: new User(),
  errorMessage: null
};

export interface RegisterState {
  isRegister: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const reducer = createReducer(
  initialRegisterState,
  on(RegisterAction.registerUser, (state, action) => {
    return {
      ...state,
      user: action.registerUser,
      isRegister: false,
      error: null,
    }
  }),
  on(RegisterAction.registrationSuccess, (state, action) => {
    return {
      ...state,
      isRegister: true,
      user: action.user,
      error: null,
    }
  }),
  on(RegisterAction.clearRegisterForm, (state, action) => {
    return {
      ...state,
      isRegister: false,
      user: new User()
    }
  })
)
