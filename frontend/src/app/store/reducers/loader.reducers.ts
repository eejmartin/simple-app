import {createReducer, on} from "@ngrx/store";
import * as LoaderActions from '../actions/loader.actions';

export const loaderFeatureKey = 'loader';

export const initialLoaderState: LoaderState = {
  active: 0,
  actionsInProgress: []
};

export interface LoaderState {
  active: number;
  actionsInProgress: any[];
}

export const reducer = createReducer(
  initialLoaderState,
  on(LoaderActions.showLoader, (state, action) => {
    const isActionAlreadyInProgress = state.actionsInProgress.filter((currentAction: any) =>
      currentAction === action.type).length;

    if (isActionAlreadyInProgress) {
      return state;
    }

    const newActionsInProgress = [
      ...state.actionsInProgress,
      action.type
    ];

    return {
      ...state,
      active: newActionsInProgress.length,
      actionsInProgress: newActionsInProgress
    };
  }),
  on(LoaderActions.hideLoader, (state, action) => {
    const newActionsInProgress = action.type ? state.actionsInProgress.filter((currentAction: any) =>
      currentAction !== action.type) : state.actionsInProgress;

    return {
      ...state,
      actionsInProgress: newActionsInProgress,
      active: state.active > 0 ? newActionsInProgress.length : 0
    };
  })
)

export const isLoadingSpinnerActive = (state: LoaderState) => state.active;
