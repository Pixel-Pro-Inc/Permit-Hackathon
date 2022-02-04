import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-ammendments',
  templateUrl: './ammendments.component.html',
  styleUrls: ['./ammendments.component.css']
})
export class AmmendmentsComponent implements OnInit {

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
  }
  siteTelephone = this.shared.siteTelephone;
}
