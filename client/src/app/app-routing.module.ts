import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdminComponent } from './admin/admin.component';
import { AmmendmentsComponent } from './ammendments/ammendments.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { SignupComponent } from './signup/signup.component';
import { AdminGuard } from './_guards/admin.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';
import { NavigatedGuard } from './_guards/navigated.guard';

const routes: Routes = [
  { path: 'userprofile', component: UserprofileComponent},
  { path: '', component: HomeComponent, canActivate: [NavigatedGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [NavigatedGuard]},
  { path: 'login', component: LoginComponent, canActivate: [NavigatedGuard]},
  { path: 'compliance', component: ComplianceComponent, canActivate: [NavigatedGuard] },
  { path: 'ammendments', component: AmmendmentsComponent, canActivate: [NavigatedGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard, NavigatedGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [NavigatedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
