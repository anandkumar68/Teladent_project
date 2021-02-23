import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

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
  constructor(
    private api: WebApiService,
    public ngxLoader: NgxUiLoaderService,
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
          this.appointmentList = res.data;
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
}
