import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store";
import {authFeatureKey} from "../../store/reducers/auth.reducers";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import * as fromAuthActions from 'src/app/store/actions/auth.actions';
import {Router} from "@angular/router";

@Component({
  selector: 'app-core-outlet',
  templateUrl: './core-outlet.component.html',
  styleUrls: ['./core-outlet.component.scss']
})
export class CoreOutletComponent implements OnInit {
  isLoggedIn$?: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(state => state[authFeatureKey].isAuthenticated)
      .pipe(switchMap((isAuth) => {
        return of(isAuth);
      }));
  }

  logOut() {
    this.router.navigate(['/login']).then(r => {
      this.store.dispatch(fromAuthActions.logOut())
    })
  }

}
