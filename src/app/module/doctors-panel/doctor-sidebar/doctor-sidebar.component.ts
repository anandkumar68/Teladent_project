import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constant';

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.css']
})
export class DoctorSidebarComponent implements OnInit {
  userDetails: any;
  education: any;

  constructor() { }

  ngOnInit(): void {

    this.userDetails = JSON.parse(Constants.credentialsDecrypt(localStorage.getItem('user')));

    // if(this.userDetails. )
    

  }

}
