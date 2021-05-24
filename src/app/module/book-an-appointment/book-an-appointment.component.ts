import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { Constants } from 'src/app/shared/constant';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';

declare var Razorpay: any;

@Component({
  selector: 'app-book-an-appointment',
  templateUrl: './book-an-appointment.component.html',
  styleUrls: ['./book-an-appointment.component.css']
})
export class BookAnAppointmentComponent implements OnInit {

  doctorId: any;
  availableSlot: {
    weekDays: any[],
    availableSlot: any[]
  };
  doctorDetail: any;
  appointmentDate: '';
  appointmentTime: '';
  appointmentPrice = 0;
  services = {
    chk_pain_decay: false,
    chk_sensitivity: false,
    chk_bleeding: false,
    chk_child_care: false,
    chk_second_opinion: false,
    chk_other: false,
  };
  allowForOtherOpt = false;
  bookingForm: FormGroup | any;
  minDate = new Date();
  maxDate = new Date();
  submitted = false;
  currentSlot = [];
  previousAmt = 0;
  sessionValue: any = {};
  options: any = {};
  userDetailsInfo: any = {};
  coupon = ''

  constructor(
    public activatedRouter: ActivatedRoute,
    public apiService: WebApiService,
    public toastr: ToastrService,
    private fb: FormBuilder,
    private route: Router,
    private ngxLoader: NgxUiLoaderService

  ) { }

  ngOnInit(): void {

    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).removeAttribute('style');

    this.doctorId = this.activatedRouter.snapshot.params.providerId;
    this.bookinFormValidation();
    this.availableSlotList();
    this.doctorDetails();
    this.userDetails();
  }

  availableSlotList() { // Doctor Available Slots
    try {

      this.apiService.getDoctorAvailableSlot().subscribe((resolve: any) => {

        if (resolve.status === 'success') {

          this.availableSlot = resolve.data;
          this.minDate = new Date(this.availableSlot.weekDays[0]);
          this.maxDate = new Date(this.availableSlot.weekDays[this.availableSlot.weekDays.length - 1])
          this.currentSlot = this.availableSlot.availableSlot[0].slot;
          this.appointmentDate = this.availableSlot.weekDays[0];

        }

        if (resolve.status === 'error') {
          this.toastr.success(resolve.message);
          this.route.navigateByUrl('/web-panel/index')
        }

      }, (error: any) => {
        Constants.handleError(error);
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  doctorDetails() {
    try {

      this.apiService.getDoctorDetails(this.doctorId).subscribe((resolve) => {
        if (resolve.status === 'success') {

          this.doctorDetail = resolve.data;
          this.appointmentPrice = resolve.data.price;
          this.previousAmt = resolve.data.price;
          this.bookingForm.get('amount').setValue(this.appointmentPrice);
          this.bookingForm.get('doctorId').setValue(this.doctorId);
        }

        if (resolve.status === 'error') {
          this.toastr.error('Something Went Wrong')
          this.route.navigateByUrl('/web-panel/index')
        }

      },
        (error: any) => {
          Constants.handleError(error);
        })

    } catch (error) {
      console.log(error.message);
    }
  }

  selectService(value) {
    this.services[value] = true;
    for (let key in this.services) {
      if (key !== value) {
        this.services[key] = false;
      }
    }

    if (value === 'chk_other') {
      this.allowForOtherOpt = true;
      this.bookingForm.get('serviceType').setValue('');
      this.bookingForm.updateValueAndValidity();
    } else {
      this.allowForOtherOpt = false;
      value === 'chk_pain_decay' ? this.bookingForm.get('serviceType').setValue('Pain or tooth decay') :
        value === 'chk_sensitivity' ? this.bookingForm.get('serviceType').setValue('Sensitivity') :
          value === 'chk_bleeding' ? this.bookingForm.get('serviceType').setValue('Bleeding gums') :
            value === 'chk_child_care' ? this.bookingForm.get('serviceType').setValue('Child care') :
              value === 'chk_second_opinion' ? this.bookingForm.get('serviceType').setValue('Second opinion') : '';
    }

  }

  // FOR GET DATE VALUE
  onDateSelect(event: any) {
    try {
      if (event == 'Invalid Date') {
        this.bookingForm.get('slotDate')?.setErrors({ invalidDate: true });
      } else {
        let changeSlot = `${event.getFullYear()}-${event.getMonth() + 1}-${event.getDate()}`;
        let slotIndex = this.availableSlot.availableSlot.map((slot) => {
          return slot.date;
        }).indexOf(changeSlot);

        slotIndex > -1 ? this.currentSlot = this.availableSlot.availableSlot[slotIndex].slot : this.currentSlot = [];
        this.appointmentDate = event;
        this.appointmentTime = '';
        this.bookingForm.get('timeslot').setValue('');
        this.bookingForm.get('slotDate')?.updateValueAndValidity();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Booking Form
  bookinFormValidation() {
    this.bookingForm = this.fb.group({
      amount: new FormControl('', Validators.required),
      currency: new FormControl('INR', Validators.required),
      doctorId: new FormControl('', Validators.required),
      serviceType: new FormControl('', Validators.required),
      slotDate: new FormControl(new Date(this.minDate), Validators.required),
      timeslot: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ])),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  }

  // FOR GET VALIDATION ERRORS
  get validation() {
    return this.bookingForm.controls;
  }

  onSubmit() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }

    if (!this.bookingForm.invalid) {
      let form = this.bookingForm.value;
      form.coupon = this.coupon;
      this.apiService.createOrderId(form).subscribe((resolve) => {
        console.log(resolve);

        if (resolve.status === 'success') {



          sessionStorage.setItem('checkout', JSON.stringify(resolve.data));
          this.sessionValue = this.bookingForm.value;
          let slotDate = this.bookingForm.get('slotDate').value

          this.sessionValue.slotVlaue = {};
          this.sessionValue.slotVlaue.slotDate = `${slotDate.getFullYear()}-${slotDate.getMonth() + 1}-${slotDate.getDate()}`
          this.sessionValue.slotVlaue.timeslot = this.sessionValue.timeslot;
          this.sessionValue.userId = this.userDetailsInfo._id;

          this.sessionValue.id = resolve.data.id;
          this.sessionValue.razorDbId = resolve.data.razorDbId;

          // Session Storage
          let sessionValue = resolve.data;
          sessionValue.doctorDetails = this.doctorDetail;
          sessionValue.slotVlaue = {};
          sessionValue.slotVlaue.slotDate = `${slotDate.getFullYear()}-${slotDate.getMonth() + 1}-${slotDate.getDate()}`
          sessionValue.slotVlaue.timeslot = this.sessionValue.timeslot;
          sessionStorage.setItem('checkout', JSON.stringify(sessionValue));

          this.payViaRazor();
        }

        if (resolve.status === 'error') {
          this.toastr.error('Something Went Wrong');
        }

      })
    }
  }

  otherOpinion() {
    this.bookingForm.get('serviceType').setValue((document.getElementById('other_txt_active') as HTMLInputElement).value);
  }

  userDetails() {
    try {
      this.apiService.individualPatientDetails().subscribe((resolve) => {

        this.bookingForm.get('firstName').setValue(resolve.data.firstName);
        this.bookingForm.get('lastName').setValue(resolve.data.lastName);
        this.bookingForm.get('email').setValue(resolve.data.email);

        this.userDetailsInfo = resolve.data;

      }, (error) => {
        Constants.handleError(error);
      })
    } catch (error) {
      console.log(error);
    }
  }

  slotChange(value) {
    try {

      if (value === 'No Slot Available For Today') {
        this.bookingForm.get('timeslot').setValue('');
      } else {
        this.appointmentTime = value;
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  applyCoupon() { // Apply Coupon
    try {

      let coupon = (document.getElementById('coupon') as HTMLInputElement).value;
      this.coupon = coupon;
      this.apiService.applyCoupon({ coupon: coupon, doctorId: this.doctorId }).subscribe((resolve) => {
        if (resolve.status === 'success') {
          this.toastr.success(resolve.message);
          this.appointmentPrice = Number(resolve.data.amt);
          this.bookingForm.get('amount').setValue(this.appointmentPrice);
        }

        if (resolve.status === 'error') {
          this.appointmentPrice = this.previousAmt;
          (document.getElementById('coupon') as HTMLInputElement).value = '';
          this.coupon = '';
          this.bookingForm.get('amount').setValue(this.previousAmt);
          this.toastr.error(resolve.message);
        }

      }, (error) => {
        Constants.handleError(error);
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  handle_response(res: any) {
    this.ngxLoader.startLoader('loader-01');
    this.apiService.verfiyPaymentSignature({
      razorOrderId: res.razorpay_order_id,
      razorPayId: res.razorpay_payment_id,
      razorSignature: res.razorpay_signature,
      sessionValue: this.sessionValue
    }).subscribe((resolve) => {

      if (resolve.status === 'success') {
        this.route.navigateByUrl('/web-panel/booking-confirm')
        this.ngxLoader.stopLoader('loader-01');
      }

      if (resolve.status === 'error') {
        this.toastr.error(resolve.message);
        this.ngxLoader.stopLoader('loader-01');
      }

    },
      err => this.ngxLoader.stopLoader('loader-01'))
  }

  payViaRazor() {
    try {

      if (this.appointmentPrice > 0) {

        this.options = {
          "key": "rzp_test_A6SWGpN4db7LYP", // Enter the Key ID generated from the Dashboard
          "amount": `${this.sessionValue.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Tela Dent",
          "description": "Dentistry Anytime Anywhere",
          "image": "https://get-media.s3.ap-south-1.amazonaws.com/td_assets/razorpay/tela-square-logo.jpg",
          "order_id": `${this.sessionValue.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "theme": {
            "color": "#3399cc"
          },
          "handler": function (response) {
            this.handle_response(response); //does not work as cannot identify 'this'
          }.bind(this)
        }
        var rzp1 = new Razorpay(this.options);

        rzp1.on('payment.failed', function (response) {

          this.toastr.error(response.error.code);
          this.toastr.error(response.error.description);
          this.toastr.error(response.error.source);
          this.toastr.error(response.error.step);
          this.toastr.error(response.error.reason);
          this.toastr.error(response.error.metadata.order_id);
          this.toastr.error(response.error.metadata.payment_id);
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

}


