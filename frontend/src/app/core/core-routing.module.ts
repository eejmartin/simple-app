import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreOutletComponent} from "./core-outlet/core-outlet.component";
import {LoginComponent} from "./templates/login/login.component";
import {RegisterComponent} from "./templates/register/register.component";
import {AuthGuard} from "../shared/guards/auth.guard";

const routes: Routes = [
  // {
    // path: 'register',
    // canDeactivate()
    // loadChildren: () => import('').then(m => m.RegisterModule)
  // },
  {
    path: '',
    component: CoreOutletComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
      },
      // {
      //   path: '',
      //   canActivate: [AuthGuard]
      // }
    ]
    // canLoad: [AuthGuardService],
    // children: [
    //   {
    //     path: 'users',
    //     // loadChildren: () => import('')
    //     //   .then(m => m.UserModule)
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
