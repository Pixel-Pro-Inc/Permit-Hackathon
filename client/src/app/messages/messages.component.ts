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
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }

}
