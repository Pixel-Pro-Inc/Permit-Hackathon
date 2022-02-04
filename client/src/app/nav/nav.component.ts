import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { AccountService } from '../_services/account.service';
import { SharedService } from '../_services/shared.service';
import { SiteNotifications } from '../_models/site-notifications';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private accountService: AccountService, private shared: SharedService) { }
  messages: Message[] = [];
  notifications: SiteNotifications[] = [];
  User: any;

  admin = false;

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    if (this.shared.getUser() != null) {
      this.User = this.shared.getUser();

      if(this.User.admin){
        this.admin = true;
        return false;  
      }

      return true;
      
    }
    return false;
  } 

  logout() {
    this.accountService.logout();

    window.location.reload();
  }
}
