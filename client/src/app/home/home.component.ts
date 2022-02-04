import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
  }

  buttonClick(){
    if(this.shared.getUser() == null){
      this.shared.router.navigateByUrl('/login');
      return;
    }

    if(this.shared.getUser().accountType == 'Client'){
      this.shared.router.navigateByUrl('/userprofile')
    }  
  }

}
