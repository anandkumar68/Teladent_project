import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointmentList = [];
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
  individualDetails: any;

  constructor(
    private api: WebApiService,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAppointmentList();
  }

  // FOR GET APPOINTMENT LIST
  getAppointmentList() {
    try {
      this.ngxLoader.startLoader('loader-02');
      this.api.getDoctorAppiontmentlist(this.perPage, (this.currentPage * this.perPage) - this.perPage).subscribe((res: any) => {
        this.ngxLoader.stopLoader('loader-02');
        if (res.status === 'success') {
          this.appointmentList = [];
          this.appointmentList = res.data;
        }
        if (res.status === 'error') {
          this.appointmentList = [];
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
    this.getAppointmentList();
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
              this.getAppointmentList();
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
              this.getAppointmentList();
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
}
