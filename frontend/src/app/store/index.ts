import * as fromAuth from './reducers/auth.reducers';
import * as fromRegister from './reducers/register.reducers'
import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromRegister.registerFeatureKey]: fromRegister.RegisterState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,

  [fromRegister.registerFeatureKey]: fromRegister.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
