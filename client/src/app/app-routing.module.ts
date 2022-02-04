import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AmmendmentsComponent } from './ammendments/ammendments.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { MyapplicationsComponent } from './myapplications/myapplications.component';
import { NameauthComponent } from './nameauth/nameauth.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationComponent } from './registration/registration.component';
import { SignupComponent } from './signup/signup.component';
import { AdminGuard } from './_guards/admin.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';
import { NavigatedGuard } from './_guards/navigated.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [NavigatedGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [NavigatedGuard]},
  { path: 'Contact_us', component: RegisterComponent, canActivate: [NavigatedGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [NavigatedGuard]},
  { path: 'login', component: LoginComponent, canActivate: [NavigatedGuard]},
  { path: 'compliance', component: ComplianceComponent, canActivate: [NavigatedGuard] },
  { path: 'ammendments', component: AmmendmentsComponent, canActivate: [NavigatedGuard] },
  { path: 'nameauthorisation', component: NameauthComponent, canActivate: [LoggedInGuard, NavigatedGuard] },
  { path: 'nameauthorisation/:id', component: NameauthComponent, canActivate: [LoggedInGuard, NavigatedGuard] },
  { path: 'registration/:id', component: RegistrationComponent, canActivate: [LoggedInGuard, NavigatedGuard] },
  { path: 'myapplications', component: MyapplicationsComponent, canActivate: [LoggedInGuard, NavigatedGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard, NavigatedGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [NavigatedGuard] },
  { path: 'contact-us', component: RegisterComponent, canActivate: [NavigatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
