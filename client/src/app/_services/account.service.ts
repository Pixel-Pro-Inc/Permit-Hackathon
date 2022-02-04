import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService{

  constructor(private shared: SharedService) {
  }

  omangFill(model: any){
    this.shared.busyService.busy('Scanning Your Omang');

    model.Id = 5;

    var post = this.shared.http.post(this.shared.baseUrl + 'account/omangfill', model);

    post.subscribe( response => {
      console.log(response);
    },
    error => {
      this.shared.busyService.idle();
      this.shared.toastr.error(error.error);
      return;
    });
    return post;
  }

  signup(model: any){
    this.shared.busyService.busy('Creating your account...');
    this.shared.http.post(this.shared.baseUrl + 'account/signup', model).subscribe(
      response =>{
        console.log(response)
        this.shared.setUser(response);//Logs a user in
        this.shared.busyService.idle();
        this.shared.router.navigateByUrl('/');
      },
      error => {
        this.shared.busyService.idle();
        this.shared.toastr.error(error.error);
      }
    );
  }

  login(model: any){
    this.shared.busyService.busy('Signing you in');
    this.shared.http.post(this.shared.baseUrl + 'account/login', model).subscribe(
      response =>{
        this.shared.setUser(response);//Logs a user in
        this.shared.router.navigateByUrl('/');
        this.shared.busyService.idle();
      },
      error => {
        this.shared.busyService.idle();
        this.shared.toastr.error(error.error);
      }
    );
  }

  logout(){
    this.shared.removeUser();
  }

  getUsers( model:any){
    this.shared.http.get(this.shared.baseUrl+'account/getallusers').subscribe(response=>
    {
      console.log(response);
      model.users=response;
    });
  }
  
}