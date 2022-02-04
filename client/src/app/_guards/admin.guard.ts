import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../_services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private shared: SharedService) {}

  canActivate(): boolean{
    let user = this.shared.getUser();

    if(user.admin){
      return true;
    }

    return false;
  }
  
}
