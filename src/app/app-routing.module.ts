import { UserManagementComponent } from './dashboard/user-management/user-management.component';
import { ViewPolicyComponent } from './dashboard/view-policy/view-policy.component';
import { AddPolicyComponent } from './dashboard/add-policy/add-policy.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
  children: [
    {
      path: 'password-policies', // child route path
      component: ViewPolicyComponent, // child route component that the router renders
    },
    {
      path: 'add-password-policy',
      component: AddPolicyComponent, // another child route component that the router renders
    },
    {
      path: 'user-management',
      component: UserManagementComponent, // another child route component that the router renders
    },
   
    {
      path: "", pathMatch: 'full',  redirectTo: "password-policies", // child route component that the router renders
    },
  ],
},
  { path: "auth", component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
