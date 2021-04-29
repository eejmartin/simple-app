import {createReducer, on} from "@ngrx/store";
import * as LoaderActions from '../actions/loader.actions';

export const loaderFeatureKey = 'loader';

export const initialLoaderState: LoaderState = {
  name: 'loader',
  status: false
};

export interface LoaderState {
  name: string,
  status: boolean
}

export const reducer = createReducer(
  initialLoaderState,
  on(LoaderActions.showLoader, (state, action) => {
    return {
      ...state,
      status: true
    };
  }),
  on(LoaderActions.hideLoader, (state, action) => {
    return {
      ...state,
      status: false
    };
  })
)
