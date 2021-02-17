import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  doctorId: any;
  weekDays = [];
  availableSlot: {
    weekDays: [],
    availableSlot: []
  };
  previousTimeSlotSelected: any;
  selectedSlotValues: any;
  doctorDetail: any;

  constructor(
    public activatedRouter: ActivatedRoute,
    public apiService: WebApiService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.doctorId = this.activatedRouter.snapshot.params.providerId;
    this.availableSlotList();
    this.doctorDetails();
  }

  availableSlotList() {
    try {
      
      this.apiService.getDoctorAvailableSlot().subscribe((resolve) => {

        if(resolve.status === 'success') {
          this.availableSlot = resolve.data;
        }

      },
      err => console.log(err))


    } catch (error) {
      console.log(error);
    }
  }

  selectedSlot(timeslot,slotId,slotDate) {
    try {

      if(this.previousTimeSlotSelected) {
        
        (document.getElementById(this.previousTimeSlotSelected) as HTMLInputElement).classList.remove('selected');
        (document.getElementById(slotId) as HTMLInputElement).classList.add('selected');
        this.previousTimeSlotSelected = slotId;

      } else {
        (document.getElementById(slotId) as HTMLInputElement).classList.add('selected');
        this.previousTimeSlotSelected = slotId;
      }

      this.selectedSlotValues = {
        timeslot: timeslot,
        slotDate: slotDate
      }

    } catch (error) {
      console.log(error);
    }
  }

  doctorDetails() {
    try {
      
      this.apiService.getDoctorDetails(this.doctorId).subscribe((resolve) => {

        if(resolve.status === 'success') {

          this.doctorDetail = resolve.data;

        }

      },
      err => console.log(err))

    } catch (error) {
      console.log(error);
    }
  }

  bookingConfirm() {
    try {
      this.apiService.createOrderId({amount: this.doctorDetail.price, currency: "INR", doctorId: this.doctorId}).subscribe((resolve) => {
        if(resolve.status === 'success') {
          resolve.data.doctorId = this.doctorId;
          resolve.data.slotVlaue = this.selectedSlotValues;
          resolve.data.doctorDetails = this.doctorDetail;

          sessionStorage.setItem('checkout', JSON.stringify(resolve.data));
          this.router.navigateByUrl('/checkout');
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

}
