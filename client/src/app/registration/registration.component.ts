import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";
import { Subscription } from 'rxjs';
import { ServicesService } from '../_services/services.service';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;

  done1 = false;
  done2 = false;

  files: string[] = [];

  routeSub: Subscription;

  id: any;

  publicKey = "FLWPUBK_TEST-9c69b412fc3b378be6df09ff5e65d4b2-X";
 
  customerDetails = { name: this.shared.getUser().firstname + ' ' + this.shared.getUser().lastname, email: this.shared.getUser().email, phone_number: this.shared.getUser().phonenumber}
 
  customizations = {title: 'Society Registration', description: 'Application fee for registration', logo: 'https://firebasestorage.googleapis.com/v0/b/societies-and-security-hack.appspot.com/o/Societies%20Website%20Assets%2FBlue%20Union%20Logo.png?alt=media&token=584d94d0-f32d-442a-92a2-96e5b9262277'}
 
  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}
 
 paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: "registration fee" + Math.floor(Math.random() * 101),
    amount: 500,
    currency: 'BWP',
    payment_options: 'card',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  }

  constructor(private servicesService : ServicesService, private route: ActivatedRoute, private fb: FormBuilder, private flutterwave: Flutterwave, private shared: SharedService ) {
  }
  
  makePayment(){
    this.flutterwave.inlinePay(this.paymentData)
  }

  paymentResult: any = {};


  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Payment callback", response);

    this.paymentResult = response;
  }
  closedPaymentModal(): void {
    console.log('payment is closed');

    if(this.paymentResult.status == 'successful'){
      this.complete();
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(
      params => {
        this.id = (params['id']);
      }
    );
    this.initializeForm();
  }

  initializeForm(){
    this.regForm = this.fb.group({
      constitution: ['', [Validators.required]],
      formA: ['', [Validators.required]],
      membership: ['', [Validators.required]]
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

  getFinished(){
    return localStorage.getItem('finished') == 'true';
  }

  leave(){
    localStorage.removeItem('finished');
    
    this.shared.router.navigateByUrl('/myapplications');
  }

  complete(){
    let user: any = this.shared.getUser();
    
    let model: any = {};

    model.accountId = user.email == null? user.phonenumber : user.email;
    model.files = this.files;
    model.id = this.id;

    this.servicesService.reg(model);
  }

}