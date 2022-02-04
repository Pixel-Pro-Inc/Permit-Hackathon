import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { AccountService } from 'src/app/_services/account.service';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  activeTab: TabDirective;
  user = this.shared.getUser();
  messages: Message[] = [];

  constructor(private route: ActivatedRoute,
    private messageService: MessageService, private accountService: AccountService,
    private router: Router, private shared: SharedService) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })
  }

  loadMessages() {
    this.messageService.getMessageThread(this.user.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
  
   onTabActivated(data: TabDirective) {
    this.activeTab = data;
     if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {

       this.loadMessages();
     // this.messageService.createHubConnection(this.user, this.shared.getUser().username);
    } else {
     // this.messageService.stopHubConnection();
    }
  }
  /*
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
   */
  

}
