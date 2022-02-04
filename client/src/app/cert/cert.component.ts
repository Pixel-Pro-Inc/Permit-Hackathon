import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { SharedService } from '../_services/shared.service';
import { ApplicationTempComponent } from '../_templates/application-temp/application-temp.component';

@Component({
  selector: 'app-cert',
  templateUrl: './cert.component.html',
  styleUrls: ['./cert.component.css']
})
export class CertComponent implements OnInit {
  @Input() model;
  @Input() parent: ApplicationTempComponent;

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
  }

  getNumber(){
    return Math.floor(Math.random() * 10000000);
  }

  getDate(){
    return new Date().toLocaleDateString();
  }

  public convertToPDF()
  {
    this.shared.busyService.busy('Converting to pdf');
    var data = document.getElementById('contentToConvert');
   html2canvas(data).then(canvas => {

   // Few necessary setting options
   var imgWidth = 208;
   var imgHeight = canvas.height * imgWidth / canvas.width;

   console.log(imgHeight);
   console.log(imgWidth);
   
   const contentDataURL = canvas.toDataURL('image/png')
   let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
   var position = 0;
   pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight)
   let base64: string = 'data:application/pdf;base64,' + btoa(pdf.output());

   console.log(base64);

   this.model.certificate = "Certificate of Registration," + base64; // Generated PDF
   this.shared.busyService.idle();

   this.parent.continueA();
   });   
  }

}
