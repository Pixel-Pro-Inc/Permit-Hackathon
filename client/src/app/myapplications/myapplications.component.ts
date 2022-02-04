import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../_services/services.service';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-myapplications',
  templateUrl: './myapplications.component.html',
  styleUrls: ['./myapplications.component.css']
})
export class MyapplicationsComponent implements OnInit {
  applications: any = {};

  constructor(private servicesService: ServicesService, private shared: SharedService) { }

  ngOnInit(): void {
    let accountId = this.shared.getUser().email == null? this.shared.getUser().phonenumber : this.shared.getUser().email;
    this.servicesService.getMyApplications(accountId, this);
  }

  showMore(model: any){
    model.showExtra = !model.showExtra;
  }

  openWindow(url: string){
    window.open(url);
  }

}