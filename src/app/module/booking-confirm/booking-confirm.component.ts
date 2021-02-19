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

    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).removeAttribute('style');

    this.sessionValue = JSON.parse(sessionStorage.getItem('checkout'));
    sessionStorage.clear();

  }

}
