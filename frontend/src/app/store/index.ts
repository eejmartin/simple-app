import * as fromAuth from './reducers/auth.reducers';
import * as fromRegister from './reducers/register.reducers'
import * as fromLoader from './reducers/loader.reducers'
import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {AuthEffects} from "./effects/auth.effects";
import {RegisterEffects} from "./effects/register.effects";
import {LoaderEffects} from "./effects/loader.effects";

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromRegister.registerFeatureKey]: fromRegister.RegisterState;
  [fromLoader.loaderFeatureKey]: fromLoader.LoaderState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,

  [fromRegister.registerFeatureKey]: fromRegister.reducer,

  [fromLoader.loaderFeatureKey]: fromLoader.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];
export const effects = [AuthEffects, RegisterEffects, LoaderEffects];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
