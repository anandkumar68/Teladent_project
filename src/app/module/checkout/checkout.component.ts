import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  allowForPay: any;
  sessionValue: any;
  isEmailExist = false;
  emailErrorMsg= '';
  paidAmt = 0;
  buttonValue = 'Confirm and Pay';

  options = {};


  constructor(
    public apiService: WebApiService,
    public router: Router
  ) { }

  ngOnInit(): void {

    if(sessionStorage.getItem('checkout') !== null) {

      this.sessionValue = JSON.parse(sessionStorage.getItem('checkout'));
      this.allowForPay = true;
      this.sessionValue.email === null ? this.isEmailExist = false :  this.isEmailExist = true;
      this.paidAmt = this.sessionValue.amount / 100;
      this.paidAmt === 0 ? this.buttonValue = 'Confirm Appointment':'';

    } else {
      this.allowForPay = undefined;
    }

  }

  payViaRazor() {
    try {

    if(this.paidAmt > 0) {
      
      this.options = {
        "key": "rzp_test_A6SWGpN4db7LYP", // Enter the Key ID generated from the Dashboard
        "amount": `${this.sessionValue.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Tela Dent",
        "description": "Dentistry Anytime Anywhere",
        "image": "../../../assets/img/tela-square-logo.jpg",
        "order_id": `${this.sessionValue.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "theme": {
          "color": "#3399cc"
        },
        "handler": function (response){
          this.handle_response(response); //does not work as cannot identify 'this'
      }.bind(this)
      }
      var rzp1 = new Razorpay(this.options);

      rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });

    rzp1.open();

    } else {

      this.handle_response({
        razorpay_order_id: '',
        razorpay_payment_id: '',
        razorpay_signature: ''
      })

    }
    } catch (error) {
      console.log(error);
    }
  }

  emailVerification(value) {
    try {
      
      let emailValue = (document.getElementById(value) as HTMLInputElement).value;

      if(emailValue.length === 0) {
        this.emailErrorMsg = '';
      } else {

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!emailValue.match(mailformat))
        {
          this.emailErrorMsg = "Invalid Email Address";
          this.isEmailExist = false
        } else {
          this.sessionValue.email = emailValue;
          this.isEmailExist = true;
          this.emailErrorMsg = '';
      }

      }

      emailValue.length === 0 ? this.emailErrorMsg = '': '';
      

    } catch (error) {
      console.log(error);
    }
  }

  handle_response(res: any){
   
    this.apiService.verfiyPaymentSignature({
      razorOrderId: res.razorpay_order_id,
      razorPayId: res.razorpay_payment_id,
      razorSignature: res.razorpay_signature,
      sessionValue: this.sessionValue
    }).subscribe((resolve) => {

      if(resolve.status ==='success') {
        this.router.navigateByUrl('/booking-confirm')
      }

    })
  }

}
