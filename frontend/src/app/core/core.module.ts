import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreOutletComponent} from './core-outlet/core-outlet.component';
import {CoreRoutingModule} from "./core-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./templates/login/login.component";
import {RegisterComponent} from "./templates/register/register.component";


/* Angular Material */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from "../shared/angular-material.module";

/* FormsModule */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/* Angular Flex Layout */
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [CoreOutletComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class CoreModule {
}
