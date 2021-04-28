import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store";
import * as fromAuthActions from "./store/actions/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-app';

  constructor(private store: Store<AppState>) {
    this.store.dispatch(fromAuthActions.loadUser());
  }
}
