import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { Application } from '../_models/application';

@Injectable({
  providedIn: 'root'
})
export class DashService  {


  constructor(private shared: SharedService) { }

  getapplications(model: any, dir: string) {
    //dir can be any combination of required call to the API. So a call for reports/totalapplications will go into the parameters and thats what's going to be called
    //The known list is
    /**
    * report/totalapplication
    * report/inprocessapplication
    * report/rejectedapplication
    */
    return this.shared.http.post(this.shared.baseUrl + dir, model).pipe(
      map((response: Application[]) => {
        return response;
      })
    )
  }


  payment(model: any) {
    return this.shared.http.post(this.shared.baseUrl + 'report/paymentmethods', model).pipe(
      map((response: PaymentItem[]) => {
        return response;
      })
    )
  }

  exportToExcel() {
    window.open(this.shared.baseUrl + 'excel/export/');
  }
}
