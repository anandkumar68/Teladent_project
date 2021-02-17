import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.css']
})
export class BookingConfirmComponent implements OnInit {

  sessionValue: any;

  constructor() { }

  ngOnInit(): void {

    this.sessionValue = JSON.parse(sessionStorage.getItem('checkout'));
    sessionStorage.clear();

  }

}
