import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../_services/services.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  applications: any = {};
  comp: any = this;
  mod:any = {};

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.GetApps();  
  }

  showMsg(){
    this.mod.showMsg = !this.mod.showMsg; this.mod.showReview = false; this.mod.showRejected = false; this.mod.showAccepted = false; this.mod.showReport = false;
  }

  showReview(){
    this.mod.showReview = !this.mod.showReview; this.mod.showRejected = false; this.mod.showAccepted = false; this.mod.showReport = false; this.mod.showMsg = false;
  }

  showRejected(){
    this.mod.showMsg = false; this.mod.showReview = false; this.mod.showRejected = !this.mod.showRejected; this.mod.showAccepted = false; this.mod.showReport = false;
  }

  showAccepted(){
    this.mod.showMsg = false; this.mod.showReview = false; this.mod.showRejected = false; this.mod.showAccepted = !this.mod.showAccepted; this.mod.showReport = false;
  }

  showReport(){
    this.mod.showMsg = false; this.mod.showReview = false; this.mod.showRejected = false; this.mod.showAccepted = false; this.mod.showReport = !this.mod.showReport;
  }

  

  hasReview(){
    return this.applications.find(element => element.review == true) != null;
  }

  hasRejected(){
    return this.applications.find(element => element.rejected == true) != null;
  }

  hasAccepted(){
    return this.applications.find(element => element.accepted == true) != null;
  }

  Reload(){
    window.location.reload();
  }

  GetApps(){
    this.service.getAppsAdmin(this);
  }

  Approve(model: any){
    this.service.editAdminApp(model, this);
  }

  Reject(model: any){
    this.service.editAdminApp(model, this);
  }

  MarkForCorrections(model: any){
    this.service.editAdminApp(model, this);
  }

  countElementsReview(){
    return this.applications.filter(e => e.review).length;
  }

  countElementsRejected(){
    return this.applications.filter(e => e.rejected).length;
  }

  countElementsAccepted(){
    return this.applications.filter(e => e.accepted).length;
  }

}
