import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  math = Math;

  currentPage = 1;
  perPage = 10;
  dashboardData = []
  progressData:any;
  individualDetails: any;
  todayDate:Date;

  dashboardTab:any;

  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
  };
  constructor(
    private api: WebApiService,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.getDashboardDetails('upComing');
  }


  // FOR GET APPOINTMENT LIST
  getDashboardDetails(value: any) {
    try {
      this.ngxLoader.startLoader('loader-02');
      this.api.getDoctorDashboardDetails(this.perPage, (this.currentPage * this.perPage) - this.perPage, value).subscribe((res: any) => {
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {
          this.dashboardData = [];
          this.progressData = {};
          this.dashboardData = res.data.dashboardList;
          this.progressData = res.data;

        }
        if (res.status === 'error') {
          this.dashboardData = [];
          this.progressData = {};

        }
      }, error => {
        this.ngxLoader.stopLoader('loader-02');
        console.log(error);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // ON PAGE CHANGE EVENTS
  onPageChange(page: number) {
    this.currentPage = page;
  }

  async updateStatus(status, appointId) {
    try {
      
      let body = {
        status: status,
        appointId: appointId,
        description: ''
      }

      if(status === 'completed') {
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputLabel: 'Description',
          inputPlaceholder: 'Type patient description here. Atleast 10 characters...',
          inputAttributes: {
            'aria-label': 'Type patient description here'
          },
          showCancelButton: true,
          allowOutsideClick: false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        
        if (text.trim().length < 10) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Description Should be atleast 10 characters'
          })
        }

        if (text.trim().length >= 10) {
          body.description = text.trim();
          this.ngxLoader.startLoader('loader-02');
          this.api.updateAppointmentStatus(body).subscribe((res: any) => {
            this.ngxLoader.stopLoader('loader-02');
            if (res.status === 'success') {
              this.toastr.success(res.message);
              this.getDashboardDetails(this.dashboardTab);
            }
            if (res.status === 'error') {
              this.toastr.error(res.message);
            }
          }, (error: any) => {
            console.log(error);
            this.ngxLoader.stopLoader('loader-02');
          });
        }

      } else {

        this.ngxLoader.startLoader('loader-02');
          this.api.updateAppointmentStatus(body).subscribe((res: any) => {
            this.ngxLoader.stopLoader('loader-02');
            if (res.status === 'success') {
              this.toastr.success(res.message);
              this.getDashboardDetails(this.dashboardTab);
            }
            if (res.status === 'error') {
              this.toastr.error(res.message);
            }
          }, (error: any) => {
            console.log(error);
            this.ngxLoader.stopLoader('loader-02');
          });

      }

    } catch (error) {
      console.log(error.message);
    }
  }

  // INDIVIDUAL APPOINTMENT DETAILS
  individualAppointmentDetails(appointId) {
    try {
      
      let body = {
        appointId: appointId
      }

      this.ngxLoader.startLoader('loader-02');
      this.api.individualAppointmentDetails(body).subscribe((res: any) => {
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


  checkTabValue(value){
    try {
      if(value === 'uptoNow'){
        this.dashboardTab = 'uptoNow';
        this.getDashboardDetails(value);
      }

      if(value === 'upComing'){
        this.dashboardTab = 'upComing';
        this.getDashboardDetails(value);
      }
    } catch (error) {
      console.error(error);
    }
  }



}
