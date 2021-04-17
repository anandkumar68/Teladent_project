import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.css']
})
export class InvoicePdfComponent implements OnInit {
  invoicePdfDetails : any;
  bankDetails : any;
  pdfId: any;

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(
    public api: WebApiService,
    public ngxLoader: NgxUiLoaderService,
    public activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.pdfId = this.activatedRouter.snapshot.params.pdfId;
    this.loadPdfDetails();

  }
  generarPDF() {

    const div = document.getElementById('htmlData');
    const options = {
      scale: 6,
      x:240,
      y:0  
    };

    html2canvas(div, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('p', 'mm', 'a4');

      // Add image Canvas to PDF
      const bufferX = 10;
      const bufferY = 10;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save('invoice.pdf');  
    });
  }
  loadPdfDetails () {
    try {
      this.ngxLoader.startLoader('loader-02');
      this.api.pdfInvoiceDetails(this.pdfId).subscribe((resolve) => {
        
        if(resolve.status === 'success') {

          this.invoicePdfDetails = resolve.data.list;
          this.bankDetails = resolve.data.bankDetails          
          this.ngxLoader.stopLoader('loader-02');

        }

        if(resolve.status === 'error') {
          
          this.ngxLoader.stopLoader('loader-02');

        }

      }, (error) => {
          this.ngxLoader.stopLoader('loader-02');
          console.log(error.message);
      })

    } catch (error) {
      this.ngxLoader.stopLoader('loader-02');
      console.log(error);
    }
  }

}
