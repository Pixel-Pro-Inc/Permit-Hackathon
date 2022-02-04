import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent implements OnInit {
  constructor(private shared: SharedService) { }

  ngOnInit(): void {
  }
  siteTelephone = this.shared.siteTelephone;
}
