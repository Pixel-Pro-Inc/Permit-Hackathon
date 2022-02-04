import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { AmmendmentsComponent } from './ammendments/ammendments.component';
import { NameauthComponent } from './nameauth/nameauth.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyapplicationsComponent } from './myapplications/myapplications.component';
import { AdminComponent } from './admin/admin.component';
import { ApplicationTempComponent } from './_templates/application-temp/application-temp.component';
import { RegistrationComponent } from './registration/registration.component';
import { PaypointComponent } from './paypoint/paypoint.component';
import { FlutterwaveModule } from "flutterwave-angular-v3";
import { CertComponent } from './cert/cert.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberCardComponent } from './members/member-card/member-card.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserprofileComponent,
    RegisterComponent,
    SignupComponent,
    TextInputComponent,
    DateInputComponent,
    LoginComponent,
    NavComponent,
    ComplianceComponent,
    AmmendmentsComponent,
    NameauthComponent,
    MyapplicationsComponent,
    AdminComponent,
    ApplicationTempComponent,
    RegistrationComponent,
    PaypointComponent,
    CertComponent,
    MessagesComponent,
    MemberMessagesComponent,
    MemberDetailComponent,
    MemberCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    FlutterwaveModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }