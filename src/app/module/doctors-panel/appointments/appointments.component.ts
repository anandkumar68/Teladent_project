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
  urls = [];
  updateDrug = [];
  completeAppointId: any;
  isDescription = false;

  constructor(
    private api: WebApiService,
    public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
      var $this = $(this),
          label = $this.prev('label');
    
        if (e.type === 'keyup') {
          if ($this.val() === '') {
              label.removeClass('active highlight');
            } else {
              label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
            label.removeClass('active highlight'); 
          } else {
            label.removeClass('highlight');   
          }   
        } else if (e.type === 'focus') {
          
          if( $this.val() === '' ) {
            label.removeClass('highlight'); 
          } 
          else if( $this.val() !== '' ) {
            label.addClass('highlight');
          }
        }
    
    });
    
    $('.tab a').on('click', function (e) {
      
      e.preventDefault();
      
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
      
      const target = $(this).attr('href');
    
      $('.tab-content > div').not(target).hide();
      
      $(target).fadeIn(600);
      
    });

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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.updateDrug.push(event.target.files[0])
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                   this.urls.push(event.target.result);
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  completeRequest(appointId) {
    try {

      this.cleanModalBox();
      (document.getElementById('pesc') as HTMLInputElement).classList.add('active');
      (document.getElementById('pescLink') as HTMLInputElement).click();
      this.completeAppointId = appointId;

    } catch (error) {
      console.log(error);
    }
  }

  submitDrug() {

    let suggestion = (document.getElementById('drug_suggestion') as HTMLInputElement).value;
    let formData = new FormData();

    for(let file of this.updateDrug){
      formData.append('drug', file);
    }
    formData.append('suggestion', suggestion);
        
    this.api.updatePrescription(formData, this.completeAppointId).subscribe((resolve) => {
      this.ngxLoader.startLoader('loader-02');

      if(resolve.status === 'success') {

        this.toastr.success(resolve.message);
        this.cleanModalBox();
        (document.getElementById('desc') as HTMLInputElement).classList.add('active');
        (document.getElementById('descLink') as HTMLInputElement).click();
        this.ngxLoader.stopLoader('loader-02');

      }

      if(resolve.status === 'error') {

        this.toastr.error(resolve.message);
        this.ngxLoader.stopLoader('loader-02');

      }
      
    },
    (err) => {
      this.ngxLoader.stopLoader('loader-02');
    }
    )

  }

  descriptionValidation() {
    try {
      
      if((document.getElementById('descArea') as HTMLInputElement).value.trim().length > 10) {
        this.isDescription = true;
      } else {
        this.isDescription = false;
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  submitCompleteRequest() {
    try {
      
      let body = {
        status: 'completed',
        appointId: this.completeAppointId,
        description: (document.getElementById('descArea') as HTMLInputElement).value.trim()
      }

          this.ngxLoader.startLoader('loader-02');
          this.api.updateAppointmentStatus(body).subscribe((res: any) => {
            this.ngxLoader.stopLoader('loader-02');
            if (res.status === 'success') {
              this.toastr.success(res.message);
              this.getAppointmentList();
              this.cleanModalBox();
              (document.getElementById('closeApp') as HTMLInputElement).click();
              
            }
            if (res.status === 'error') {
              this.toastr.error(res.message);
            }
          }, (error: any) => {
            console.log(error);
            this.ngxLoader.stopLoader('loader-02');
          });

    } catch (error) {
      console.log(error.message);
    }
  }

  cleanModalBox() {
    try {
      
        (document.getElementById('suggestionArea') as HTMLInputElement).classList.remove('active');
        (document.getElementById('suggestionArea') as HTMLInputElement).classList.remove('highlight');
        (document.getElementById('drug_suggestion') as HTMLInputElement).value = '';
        (document.getElementById('fileChosen') as HTMLInputElement).value = '';
        (document.getElementById('descArea') as HTMLInputElement).value = '';
        (document.getElementById('descLabel') as HTMLInputElement).classList.remove('active');
        (document.getElementById('descLabel') as HTMLInputElement).classList.remove('highlight');
        
        this.urls = [];
        this.updateDrug = [];
        this.isDescription = false;

    } catch (error) {
      console.log(error.message);
    }
  }

  

}
