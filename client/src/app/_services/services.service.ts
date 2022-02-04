import { Component, Injectable } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { MyapplicationsComponent } from '../myapplications/myapplications.component';
import { NameauthComponent } from '../nameauth/nameauth.component';
import { RegistrationComponent } from '../registration/registration.component';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private shared: SharedService) { }

  nameAuth(model: any, component: NameauthComponent){
    this.shared.busyService.busy('Uploading files');
    this.shared.http.post(this.shared.baseUrl + 'service/nameauth/submit', model).subscribe(
      response =>{
        this.shared.busyService.idle();

        component.done4 = true;
      },
      error =>{
        this.shared.busyService.idle();
        this.shared.toastr.error(error.error);
      }
    );
  }

  reg(model: any){
    this.shared.busyService.busy('Uploading files');
    this.shared.http.post(this.shared.baseUrl + 'service/reg/submit/' + model.id, model).subscribe(
      response =>{
        this.shared.busyService.idle();
      },
      error =>{
        this.shared.busyService.idle();
        this.shared.toastr.error(error.error);
      }
    );
  }

  regEdit(m: any, model: any, component: any){
    this.shared.busyService.busy('Editing files');
    this.shared.http.post(this.shared.baseUrl + 'service/nameauth/edit/' + m, model).subscribe(
      response =>{
        this.shared.busyService.idle();

        component.done2 = true;
      },
      error =>{
        this.shared.busyService.idle();
        this.shared.toastr.error(error.error);
      }
    );
  }

  nameAuthEdit(m: any, model: any, component: NameauthComponent){
    this.shared.busyService.busy('Editing files');
    this.shared.http.post(this.shared.baseUrl + 'service/nameauth/edit/' + m, model).subscribe(
      response =>{
        this.shared.busyService.idle();

        component.done4 = true;
      },
      error =>{
        this.shared.busyService.idle();
        this.shared.toastr.error(error.error);
      }
    );
  }

  getMyApplications(model: string, component: any){
    this.shared.busyService.busy('Collecting files');
    this.shared.http.get(this.shared.baseUrl + 'service/getmyapplications/' + model).subscribe(
      response =>{
        this.shared.busyService.idle();

        component.applications = response;
      },
      error =>{
        this.shared.busyService.idle();
        //this.shared.toastr.error(error.error);
      }
    );
  }

  getAppsAdmin(component: AdminComponent){
    this.shared.busyService.busy('Collecting files');
    this.shared.http.get(this.shared.baseUrl + 'service/getapplications/').subscribe(
      response =>{
        this.shared.busyService.idle();

        component.applications = response;
      },
      error =>{
        this.shared.busyService.idle();
        this.shared.toastr.error(error.error);
      }
    );
  }

  editAdminApp(model: any, component: AdminComponent){
    this.shared.busyService.busy('Saving changes');
    this.shared.http.post(this.shared.baseUrl + 'service/editappadmin', model).subscribe(
      response =>{
        this.shared.busyService.idle();

        component.Reload();
      },
      error =>{
        this.shared.busyService.idle();
        this.shared.toastr.error(error.error);
      }
    );
  }
}