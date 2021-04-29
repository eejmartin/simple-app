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
import {effects, metaReducers, reducers} from "./store";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {CookieService} from "ngx-cookie-service";
import {CookieJwtService} from "./shared/services/auth/cookie-jwt.service";
import {interceptorProviders} from "./shared/interceptors/interceptors";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    CoreModule,
    RouterModule.forRoot([
      {path: '**', component: PageNotFoundComponent}
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot(effects),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    ApiService,
    CookieService,
    CookieJwtService,
    interceptorProviders
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
