import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as LoaderAction from '../actions/loader.actions'

@Injectable()
export class LoaderEffects {
  constructor(private actions$: Actions) {
  }

  showLoader$ = createEffect(() => this.actions$.pipe(ofType(LoaderAction.showLoader)))

  hideLoader$ = createEffect(() => this.actions$.pipe(ofType(LoaderAction.hideLoader)))
}
