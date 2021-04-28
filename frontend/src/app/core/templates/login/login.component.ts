import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import * as fromAuthActions from 'src/app/store/actions/auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/';
import {Credentials} from "../../../shared/models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    const credentials = new Credentials(f.value.username, f.value.password);
    this.store.dispatch(fromAuthActions.logIn({credentials}));
  }
}
