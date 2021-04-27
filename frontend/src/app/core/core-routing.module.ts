import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreOutletComponent} from "./core-outlet/core-outlet.component";
import {LoginComponent} from "./templates/login/login.component";
import {RegisterComponent} from "./templates/register/register.component";

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
        component: LoginComponent
        // canDeactivate()
      },
      {
        path: 'register',
        component: RegisterComponent
      }
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
