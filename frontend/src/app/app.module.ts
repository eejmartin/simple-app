import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

import {AuthService} from "./shared/services/auth/auth.service";
import {ApiService} from "./shared/services/api/api.service";
import {metaReducers, reducers} from "./store";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '**', component: PageNotFoundComponent}
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
