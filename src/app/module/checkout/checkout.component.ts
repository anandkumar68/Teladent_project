import { Component, OnInit } from '@angular/core';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  options = {
    "key": "rzp_test_A6SWGpN4db7LYP", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Tela Dent",
    "description": "Dentistry Anytime Anywhere",
    "image": "https://example.com/your_logo",
    "order_id": "order_Gab9k0X4eS1DaT", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "theme": {
        "color": "#3399cc"
    }
};


  constructor() { }

  ngOnInit(): void {
  }

  payViaRazor() {
    try {
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


    } catch (error) {
      console.log(error);
    }
  }

}
