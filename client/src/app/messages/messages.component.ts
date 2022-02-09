import { Message } from '../_models/message';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container: 'Unread';
  pageNumber = 1;
  pageSize = 5;

  constructor(private shared: SharedService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();// I am assuming this is when the messages are loaded up. So there is no real-time capability set up yet
  }

  loadMessages() {
    //I commented the below, cause I want to completely do this without pagination and see what I would have done personally
    /**
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      //simply giving it a response fought cause it was expecting a paginated result.
      //this.messages = response;
      console.log(response.result);
    },
      error => {
        console.log(error);
      });
*/
    this.messageService.getMessages1().subscribe(response => {
      this.messages = response;
      console.log(response);
    },
      error => {
        console.log(error);
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }

}
