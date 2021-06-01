import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { AuthService } from './shared/services/auth/auth.service';
import { ApiService } from './shared/services/api/api.service';
import { effects, metaReducers, reducers } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { CookieJwtService } from './shared/services/auth/cookie-jwt.service';
import { interceptorProviders } from './shared/interceptors/interceptors';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserService } from './shared/services/user/user.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./core/core.module').then((m) => m.CoreModule),
        },
        { path: '**', component: PageNotFoundComponent },
      ],
      { enableTracing: true }
    ),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot(effects),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    ApiService,
    UserService,
    CookieService,
    CookieJwtService,
    interceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
