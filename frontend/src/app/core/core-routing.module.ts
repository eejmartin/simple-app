import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreOutletComponent } from './core-outlet/core-outlet.component';
import { LoginComponent } from './templates/login/login.component';
import { RegisterComponent } from './templates/register/register.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CoreOutletComponent,
    children: [
      {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full',
      },
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
