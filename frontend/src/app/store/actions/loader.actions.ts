import {createAction} from "@ngrx/store";

export enum LoaderActionsType  {
  SHOW_LOADER = '[Loader] Show loader action',
  HIDE_LOADER = '[Loader] Hide loader action'
}

export const showLoader = createAction(
  LoaderActionsType.SHOW_LOADER
)

export const hideLoader = createAction(
  LoaderActionsType.HIDE_LOADER
)
