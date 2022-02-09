import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(public http: HttpClient, public toastr: ToastrService, public router: Router, public busyService: BusyService) { }

  public setUser(model: any){
    localStorage.setItem('user', JSON.stringify(model));
  }

  public getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  public removeUser(){
    localStorage.removeItem('user');
  }

  public baseUrl = environment.apiUrl;

  public hasApplication: boolean;
  public siteTelephone: string = "3214567";
  public appComp: AppComponent = null;
}
