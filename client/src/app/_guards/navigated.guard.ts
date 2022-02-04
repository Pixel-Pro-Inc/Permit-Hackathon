import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { SharedService } from '../_services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class NavigatedGuard implements CanActivate {
  constructor(private shared: SharedService){}
  canActivate(): boolean{
    let a:AppComponent = this.shared.appComp;
    
    a.topFunction();

    return true;
  }
  
}
