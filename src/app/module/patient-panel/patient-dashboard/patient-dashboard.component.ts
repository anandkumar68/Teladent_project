import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  math = Math;

  currentPage = 1;
  perPage = 10;
  dashboardData = [];
  individualDetails = {
    appointmentId: '',
    appointmentDate: '',
    appointmentTime: '',
    currentStatus: '',
    statusDate: '',
    paid: ''
  };
  prescriptionDetails = {
    appointmentId: "",
    prescriptionTxt: "",
    prescriptionAttach: [],
    currentStatus: "Completed",
    statusDate: "",
    appointmentDate: "",
    appointmentTime: "",
    paid: "",
    serviceType: "",
    description: ""
  }


  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
  };
  dashboardTab: string;
  constructor(
    private api: WebApiService,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getDashboardDetails('appointment');
  }


  // FOR GET DASHBAORD LIST
  getDashboardDetails(value: any) {
    try {
      this.ngxLoader.startLoader('loader-02');
      this.api.getPatientDashboardDetails(this.perPage, (this.currentPage * this.perPage) - this.perPage, value).subscribe((res: any) => {
        console.log(res);
        
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {
          this.dashboardData = [];
          this.dashboardData = res.data.dashboardList;

        }
        if (res.status === 'error') {
          this.dashboardData = [];

        }
      }, error => {
        this.ngxLoader.stopLoader('loader-02');
        console.log(error);
      });
    } catch (error) {
      console.error(error);
    }
  }


  checkTabValue(value){
    try {
      this.currentPage = 1;
      if(value === 'appointment'){
        this.dashboardTab = 'appointment';
        this.getDashboardDetails(value);
      }

      if(value === 'prescription'){
        this.dashboardTab = 'prescription';
        this.getDashboardDetails(value);
      }

      if(value === 'invoice'){
        this.dashboardTab = 'invoice';
        this.getDashboardDetails(value);
      }

      if(value === 'booking'){
        this.dashboardTab = 'booking';
        this.getDashboardDetails(value);
      }

    } catch (error) {
      console.error(error);
    }
  }

    // INDIVIDUAL APPOINTMENT DETAILS
  individualAppointmentDetails(appointId) {
      try {
        
        let body = {
          appointId: appointId
        }
  
        this.ngxLoader.startLoader('loader-02');
        this.api.individualAppointmentPatDetails(body).subscribe((res: any) => {
          this.ngxLoader.stopLoader('loader-02');
          if (res.status === 'success') {
  
            this.individualDetails = res.data;
  
          }
          if (res.status === 'error') {
            this.toastr.error(res.message);
          }
        }, (error: any) => {
          console.log(error);
          this.ngxLoader.stopLoader('loader-02');
        });
  
      } catch (error) {
        console.log(error);
      }
  }


      // ON PAGE CHANGE EVENTS
  onPageChange(page: number) {
    this.currentPage = page;
    this.getDashboardDetails(this.dashboardTab);
  
  }


  //PRESCRIPTION DETAILS
  prescriptionDetailsView(appointId) {
    try {
      
      let body = {
        appointId: appointId
      }

      this.ngxLoader.startLoader('loader-02');
      this.api.individualPresPatDetails(body).subscribe((res: any) => {
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {

          this.prescriptionDetails = res.data;

        }
        if (res.status === 'error') {
          this.toastr.error(res.message);
        }
      }, (error: any) => {
        console.log(error);
        this.ngxLoader.stopLoader('loader-02');
      });

    } catch (error) {
      console.log(error);
    }
}

  //BILLING DETAILS
  billingDetailsView(appointId) {
    try {
      
      let body = {
        appointId: appointId
      }

      this.ngxLoader.startLoader('loader-02');
      this.api.individualPresPatDetails(body).subscribe((res: any) => {
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {

          this.prescriptionDetails = res.data;

        }
        if (res.status === 'error') {
          this.toastr.error(res.message);
        }
      }, (error: any) => {
        console.log(error);
        this.ngxLoader.stopLoader('loader-02');
      });

    } catch (error) {
      console.log(error);
    }
}

}
