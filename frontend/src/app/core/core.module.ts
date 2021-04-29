import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreOutletComponent} from './core-outlet/core-outlet.component';
import {CoreRoutingModule} from "./core-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./templates/login/login.component";
import {RegisterComponent} from "./templates/register/register.component";

/* Angular NgRx */

import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "../store/effects/auth.effects";
import {RegisterEffects} from "../store/effects/register.effects";
import {metaReducers, reducers} from "../store";

/* Angular Material */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/* FormsModule */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/* Angular Flex Layout */
import {FlexLayoutModule} from "@angular/flex-layout";
import {AuthGuard} from "../shared/guards/auth.guard";
import {UserService} from "../shared/services/user/user.service";


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
    StoreModule.forFeature('coreModule', reducers),
    EffectsModule.forFeature([AuthEffects, RegisterEffects]),
  ],
  providers: [AuthGuard, UserService]
})
export class CoreModule {
}
