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
import { PolicyService } from './services/policy.service';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DigitOnlyModule } from '@uiowa/digit-only';

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
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DigitOnlyModule
  ],
  providers: [
    { provide: "BASE_API_URL", useValue: environment.baseApiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    PolicyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
