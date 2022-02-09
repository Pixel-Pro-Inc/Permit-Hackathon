import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Group } from '../_models/group';
import { Message } from '../_models/message';
import { map } from 'rxjs/operators';
import { getPaginatedResult, getPaginationHeaders } from './pagination-helper';
import { SharedService } from './shared.service';
import { MessageParams } from '../_models/message-params';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private shared: SharedService) {
    
  }

  //connected with controller but will be made obselete
  getMessages(pageNumber, pageSize, container) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    //I commented out the below code cause we haven't enabled pagination in the controller so it's coming up empty and throwing errors
    return getPaginatedResult<Message[]>(this.shared.baseUrl + 'message/messages/getmessages', params, this.shared.http);
    //return this.shared.http.get<Message[]>(this.shared.baseUrl + 'message/messages/getmessages');
  }

  //this method is replaces getMessages()
  getMessages1() {
    let messageParams: any = {};
    //We need to change this so that it can collect for everyone instead of just a specific person
    //I think this will have to set up when the real time thingy is made. But for now this will stay
    messageParams.senderEmail = 'yewotheu123456789@gmail.com';
    messageParams.username = 'Yewo Theu';
    messageParams.container = 'Unread';

    //console.log(messageParams);

     return this.shared.http.post(this.shared.baseUrl + 'message/messages/getmessages', messageParams).pipe(
      map((response: Message[]) => {
        return response;
      })
    );
  }

  //connected with controller
  getMessageThread(otherusername: string) {
    //In the future consider adding pagination here
    return this.shared.http.get<Message[]>(this.shared.baseUrl + 'message/messages/thread/' + otherusername);
  }
  /*
   async sendMessage(username: string, content: string) {
    return this.hubConnection.invoke('SendMessage', { recipientUsername: username, content })
      .catch(error => console.log(error));
  }
  **/
 
  //This should connect. I didn't see the top half cause I tried to got ahead and went straight to the repo
  sendMessage(username: string, content: string) {
    let user=this.shared.getUser();
    let model:any={ };
    model.senderphoneNumber=user.phonenumber;
    model.senderEmail=user.email;
    model.recipientUsername;
    model.recipientEmail;
    model.content=content;
    return this.shared.http.post<Message>(this.shared.baseUrl + 'message/messages/createmessage', { recipientUsername: username, content });
  }

  //Removed user and the call for user tokens in this method. Not sure what that will break
  createHubConnection(otherUsername: string) {
    //this.shared.busyService.busy();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername)
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start()
      .catch(error => console.log(error))
      .finally(() => this.shared.busyService.idle());

    this.hubConnection.on('ReceiveMessageThread', messages => {
      this.messageThreadSource.next(messages);
    })

    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(take(1)).subscribe(messages => {
        this.messageThreadSource.next([...messages, message])
      })
    })

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some(x => x.username === otherUsername)) {
        this.messageThread$.pipe(take(1)).subscribe(messages => {
          messages.forEach(message => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now())
            }
          })
          this.messageThreadSource.next([...messages]);
        })
      }
    })
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.messageThreadSource.next([]);
      this.hubConnection.stop();
    }
  }
}
