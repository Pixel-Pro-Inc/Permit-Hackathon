import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-application-temp',
  templateUrl: './application-temp.component.html',
  styleUrls: ['./application-temp.component.css']
})
export class ApplicationTempComponent implements OnInit {
  @Input() model: any = {};
  @Input() parent: any;
  @Input() interactable = true;

  boolArray: boolean[] = [false, false, false, false, false, false, false, false];
  boolAr: boolean[] = [];

  showFeedback = false;

  disableApprove = true;

  constructor(private sanitizer: DomSanitizer, private shared: SharedService) { }

  OpenInNewTab(url: any){
    window.open(url);
  }

  fileURL(url: string) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.model.showLocal = this.boolArray;

    this.model.names.forEach(element => {
      this.boolAr.push(false);      
    });

    this.model.nameApproved = this.boolAr;
  }

  DisableApprove(model: any){

    model.forEach(element => {
      if(element == true){
        this.disableApprove = false;
        return;
      }      
    });

    this.disableApprove = true;
  }

  Approve(){
    if(this.model.stage != 'Registration'){
      this.model.review = false;
      this.model.accepted = true;
      this.model.admin = this.shared.getUser().email == null? this.shared.getUser().phonenumber: this.shared.getUser().email;

      this.parent.Approve(this.model);
      return;
    }    

    this.model.accepted = true;
    this.model.admin = this.shared.getUser().email == null? this.shared.getUser().phonenumber: this.shared.getUser().email;

    this.showFeedback = true;
  }

  continueA(){
    this.model.review = false;
    console.log(this.model);

    this.parent.Approve(this.model);
  }

  continueR(val){
    this.model.feedback = val;
    this.model.review = false;
    this.parent.Reject(this.model);
  }

  continueC(val){
    this.model.feedback = val;
    this.model.review = false;
    this.parent.MarkForCorrections(this.model);    
  }

  Reject(){
    this.model.rejected = true;
    this.model.admin = this.shared.getUser().email == null? this.shared.getUser().phonenumber: this.shared.getUser().email;

    this.showFeedback = true;
  }

  MarkForCorrections(){
    this.model.corrections = true;
    this.model.admin = this.shared.getUser().email == null? this.shared.getUser().phonenumber: this.shared.getUser().email;

    this.showFeedback = true;
  }

}
