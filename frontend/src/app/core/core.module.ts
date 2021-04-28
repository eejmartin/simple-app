import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreOutletComponent} from './core-outlet/core-outlet.component';
import {CoreRoutingModule} from "./core-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./templates/login/login.component";
import {RegisterComponent} from "./templates/register/register.component";

/* Angular NgRx */

import {StoreModule} from "@ngrx/store";
import * as fromAuth from '../store/reducers/auth.reducers';
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "../store/effects/auth.effects";

/* Angular Material */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/* FormsModule */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/* Angular Flex Layout */
import {FlexLayoutModule} from "@angular/flex-layout";
import {AuthGuard} from "../shared/guards/auth.guard";

@NgModule({
  declarations: [CoreOutletComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthGuard]
})
export class CoreModule {
}
