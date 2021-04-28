import {createReducer, on} from "@ngrx/store";
import {IUser} from '../../shared/interfaces/user.interface'
import * as AuthActions from "../actions/auth.actions";
import {User} from "../../shared/models/user";


export const authFeatureKey = 'auth';

export const initialState: State = {
  isAuthenticated: false,
  user: new User(),
  errorMessage: null
};

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      isAuthenticated: true,
      error: null,
    };
  }),
  on(AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      user: new User(),
      isAuthenticated: false,
      error: action.error,
    };
  })
)

