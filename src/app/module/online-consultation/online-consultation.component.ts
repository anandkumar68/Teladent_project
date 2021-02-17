import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-online-consultation',
  templateUrl: './online-consultation.component.html',
  styleUrls: ['./online-consultation.component.css']
})
export class OnlineConsultationComponent implements OnInit {

  userDoctorList = [];
  userDoctorSpecialistList = [];
  specialistObject = {};
  genderList = {
    Male: false,
    Female: false
  };
  totalDocuments = 0;
  isDisabledClassActive = true;
  pageNum = 1;
  limit = 10;

  constructor(
    public serviceApi: WebApiService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.activatedRoute.queryParams.subscribe(response => {
          this.doctorList(response);
     });
      }
    });
  }

  ngOnInit(): void {
    this.doctorSpecialistList();
    this.activatedRoute.queryParams.subscribe(response => {

      if(response['gender']) {
        (document.getElementById(response['gender']) as HTMLInputElement).checked = true;
        this.genderList[response['gender']] = true;
      }
      
      setTimeout(() => {
        if(response['speciality']) {

          for(let special of response['speciality']) {
  
            (document.getElementById(special) as HTMLInputElement).checked = true;
            this.specialistObject[special] = true;
  
          }
        }
      }, 500);

      this.doctorList(response);
 });
  }

  // Doctor List
  doctorList(data){
    try {
      
      this.serviceApi.getUserDoctorlist(data).subscribe((resolve) => {

        if(resolve.status === 'success') {

          this.userDoctorList = resolve.data.doctorList;
          this.totalDocuments = resolve.data.totalDocuments;

        }
      },
      err => console.log(err));

    } catch (error) {
      console.log(error);
    }
  }

  // Doctor Specialist list
  doctorSpecialistList(){
    try {
      
      this.serviceApi.getUserSpecialistDoctorlist().subscribe((resolve) => {

        if(resolve.status === 'success') {

          this.userDoctorSpecialistList = resolve.data;
          for(let specialist of this.userDoctorSpecialistList) {
            this.specialistObject[specialist] = false;
          }

        }
      },
      err => console.log(err));

    } catch (error) {
      console.log(error);
    }
  }

  filterSpecialist(checkedValue) {
    
    this.specialistObject[checkedValue] = (document.getElementById(checkedValue) as HTMLInputElement).checked;
    this.searchValidation();
  }

  filterGender(checkedValue) {
    
    this.genderList[checkedValue] = (document.getElementById(checkedValue) as HTMLInputElement).checked;
    if(checkedValue === 'Male'){
      (document.getElementById('Female') as HTMLInputElement).checked = false;
      this.genderList['Female'] = false;
    }     
    else {
      (document.getElementById('Male') as HTMLInputElement).checked = false;
      this.genderList['Male'] = false;
    }
    

    this.searchValidation();
  }

  // Search Validation
  searchValidation() {

    try {
      let searchValidationValue = false;

      if(
        JSON.stringify(this.genderList).search('true') > -1 ||
        JSON.stringify(this.specialistObject).search('true') > -1
      ) {
        searchValidationValue = true;
      }

      searchValidationValue ? this.isDisabledClassActive = false : this.isDisabledClassActive = true;
      if(!searchValidationValue) {
        this.router.navigate(['/online-consultation'], { queryParams: {limit: this.limit, skip: 0 } });
      }

    } catch (error) {
      console.log(error);
    }

  }

  // Doctor Filter
  filterDoctor() {
    try {
      let queryParams={};
      for(let gender in this.genderList) {
        if(this.genderList[gender] === true) {
          queryParams['gender'] = gender
        }
      }

      for(let specialist in this.specialistObject) {
        if(this.specialistObject[specialist] === true) {

          if(!queryParams['speciality']) {
            queryParams['speciality'] = [];
          }

          queryParams['speciality'].push(specialist);
          
        }
      }

      queryParams['limit'] = this.limit;
      queryParams['skip'] = (this.pageNum * this.limit) - this.limit;
      this.router.navigate(['/online-consultation'], { queryParams: queryParams });

    } catch (error) {
      console.log(error);
    }
  }

  appointmentForward(doctorId) {
    try {
      
      if(localStorage.getItem('token') === null) {
        (document.getElementById('loginCall') as HTMLInputElement).click();
      } else {
        this.router.navigateByUrl(`/booking/${doctorId}`);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
}
