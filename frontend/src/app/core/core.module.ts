import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreOutletComponent } from './core-outlet/core-outlet.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './templates/login/login.component';
import { RegisterComponent } from './templates/register/register.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserService } from '../shared/services/user/user.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CoreOutletComponent,
    children: [
      {
        path: 'login',
        canActivate: [AuthGuard],
        component: LoginComponent,
      },
      {
        path: 'register',
        canActivate: [AuthGuard],
        component: RegisterComponent,
      },
      {
        path: 'recipes',
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./../pages/recipes/recipes.module').then(
            (m) => m.RecipesModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [CoreOutletComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    // BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [AuthGuard, UserService],
})
export class CoreModule {}
