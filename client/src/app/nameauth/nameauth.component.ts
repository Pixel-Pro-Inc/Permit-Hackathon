import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicesService } from '../_services/services.service';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-nameauth',
  templateUrl: './nameauth.component.html',
  styleUrls: ['./nameauth.component.css']
})
export class NameauthComponent implements OnInit {
  nameAuthForm: FormGroup
  validators: string[] = [];
  files: string[] = [];

  done1 = false;
  done2 = false;
  done3 = false;
  done4 = false;

  routeSub: Subscription;

  id: any;

  constructor(private fb: FormBuilder, private shared: SharedService, private servicesService: ServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(
      params => {
        this.id = (params['id']);
      }
    );
    this.initializeForm();
  }

  initializeForm(){
    this.nameAuthForm = this.fb.group({
      society: ['', [Validators.required]],
      letterIntent: ['', [Validators.required]],
      minutesMeet: ['', [Validators.required]],
      attReg: ['', [Validators.required]],
      socName: ['', [Validators.required]],
      objectives: ['', [Validators.required]],
      auth: [''],
      consti: ['']
    });
  }

  onFileChange(event: any, fileName: string) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.files.push(fileName + (reader.result as string));
      };

    }
  }

  complete(){
    let user: any = this.shared.getUser();
    
    let model: any = {};

    model.files = this.files;
    model.accountId = user.email == null? user.phonenumber : user.email;
    model.societyType = this.nameAuthForm.controls['society'].value;
    model.societyNames = this.nameAuthForm.controls['socName'].value;
    model.objectives = this.nameAuthForm.controls['objectives'].value;

    if(this.id == null){
      this.servicesService.nameAuth(model, this);
      return;
    }

    this.servicesService.nameAuthEdit(this.id, model, this);  
  }
}