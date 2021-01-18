import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewPolicyComponent } from './dashboard/view-policy/view-policy.component';
import { AddPolicyComponent } from './dashboard/add-policy/add-policy.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { MarkAsteriskDirective } from './dashboard/directives/mark-asterisk.directive';
import { UserManagementComponent } from './dashboard/user-management/user-management.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ViewPolicyComponent,
    AddPolicyComponent,
    AuthComponent,
    MarkAsteriskDirective,
    UserManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    AppRoutingModule,
    HttpClientModule
  ],
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
