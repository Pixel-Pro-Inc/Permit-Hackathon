import { Component, OnInit } from '@angular/core';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from "flutterwave-angular-v3";

@Component({
  selector: 'app-paypoint',
  templateUrl: './paypoint.component.html',
  styleUrls: ['./paypoint.component.css'],
  template: ` <flutterwave-make-payment
                [public_key]="publicKey"
                amount='10'
                currency='USD'
                payment_options="card"
                redirect_url=""
                text="Pay Now"
                [customer]="customerDetails"
                [customizations]="customizations"
                [meta]="meta"
                [tx_ref]="generateReference()"
                (callback)="makePaymentCallback($event)"
                (close)="closedPaymentModal()" >
            </flutterwave-make-payment>`
})
export class PaypointComponent implements OnInit {
  //use your PUBLIC_KEY here
  publicKey = "FLWPUBK_TEST-9c69b412fc3b378be6df09ff5e65d4b2-X";
 
  customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}
 
  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}
 
  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: 'USD',
    payment_options: 'card',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  }

  constructor(private flutterwave: Flutterwave) { }

  ngOnInit(): void {
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5)
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}