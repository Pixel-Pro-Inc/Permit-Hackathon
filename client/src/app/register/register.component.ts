import { Component, OnInit } from '@angular/core';
import { CallService } from '../_services/call.service';
import { ServicesService } from '../_services/services.service';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  applications: any = {};
  
  showStage2 = false;

  constructor(public callService: CallService, public shared: SharedService, public services: ServicesService) { }

  ngOnInit(): void {
    let accountId = this.shared.getUser().email == null? this.shared.getUser().phonenumber : this.shared.getUser().email;
    this.services.getMyApplications(accountId, this);

    this.showStage2 = this.applications.find(element => element.accepted) == null? true: false;
  }

  openForm(url: string){
    window.open(url);
  }

  isLoggedOn(){
    return this.shared.getUser() == null? false: true;
  }

}