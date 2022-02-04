import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallService{

  constructor() { }

  call(num: string){
    window.open('tel:' + num);
  }
}
