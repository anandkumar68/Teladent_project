import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  math = Math;

  currentPage = 1;
  perPage = 10;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
  };
  constructor() { }

  ngOnInit(): void {
    
  }

    // ON PAGE CHANGE EVENTS
    onPageChange(page: number) {
      this.currentPage = page;
    }

  data = [
    {
      "name": "Abhishek Kumar",
      "date": "Mon Feb 22 2021 09:11:36 GMT+0530 (India Standard Time)",
      "purpose": "General",
      "type": "new patient",
      "amount": "150"
    },
    {
      "name": "Abhishek Kumar",
      "date": "Mon Feb 22 2021 09:11:36 GMT+0530 (India Standard Time)",
      "purpose": "General",
      "type": "new patient",
      "amount": "150"
    },
    {
      "name": "Abhishek Kumar",
      "date": "Mon Feb 22 2021 09:11:36 GMT+0530 (India Standard Time)",
      "purpose": "General",
      "type": "new patient",
      "amount": "150"
    },
    {
      "name": "Abhishek Kumar",
      "date": "Mon Feb 22 2021 09:11:36 GMT+0530 (India Standard Time)",
      "purpose": "General",
      "type": "new patient",
      "amount": "150"
    },
  ]

   
}
