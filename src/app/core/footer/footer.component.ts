import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoginModalComponent } from 'src/app/shared/components/login-modal/login-modal.component';
import { LoginModalService } from 'src/app/shared/components/login-modal/login-modal.service';
import { Constants } from 'src/app/shared/constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild('appDialog') appDialog: LoginModalComponent;

  constructor(
    public router: Router,
    public toastr: ToastrService,
    private loginModalService: LoginModalService
    
  ) { }

  ngOnInit(): void {
    this.loginModalService.register(this.appDialog);
    document.getElementById("copyright").innerHTML =
    "&copy; 2021 Teladent. All rights reserved. | Designed By <a href='javascript:void(0);'>Teladentist Solutions</a> ";

  }

  showDialog() {
    this.loginModalService.show()
      .then((res) => {
        console.warn('ok clicked');
      })
      .catch((err) => {
        console.log(err);
        
        console.warn('rejected');
      });
  }

  // Router Link
  footerRouter(routerLink) {
    this.router.navigateByUrl(routerLink);
  }

  // Patient Link
  patientRouter(linkType) {
    try {

      if(linkType === 'login' || linkType === 'signup') {

        if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

          (document.getElementById('logoutCall') as HTMLInputElement).click();
          setTimeout(() => {
            (document.getElementById('loginCall') as HTMLInputElement).click();
          }, 200);

        } else {

          (document.getElementById('loginCall') as HTMLInputElement).click();

        }
        this.router.navigateByUrl('/index');

      }

      if(linkType === 'booking' || linkType === 'patientDash') {

        if(!localStorage.getItem('token')) {

          console.log("Prataap")

          if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

            (document.getElementById('logoutCall') as HTMLInputElement).click();
            setTimeout(() => {
              (document.getElementById('loginCall') as HTMLInputElement).click();
            }, 200);

          } else {

            (document.getElementById('loginCall') as HTMLInputElement).click();

          }

        } else {

          Constants.credentialsDecrypt(localStorage.getItem('loginAs')) === 'onlineDoctors' ?
          this.toastr.error('You are logged in as a Doctor. Please Login as a User.'): '';

          if(Constants.credentialsDecrypt(localStorage.getItem('loginAs')) !== 'user') {

            if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

              (document.getElementById('logoutCall') as HTMLInputElement).click();
              setTimeout(() => {
                (document.getElementById('loginCall') as HTMLInputElement).click();
              }, 200);
  
            } else {
  
              (document.getElementById('loginCall') as HTMLInputElement).click();
  
            }

          } else {

          const helper = new JwtHelperService();
          const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));
          
          if(isExpired) {
  
            if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

              (document.getElementById('logoutCall') as HTMLInputElement).click();
              setTimeout(() => {
                (document.getElementById('loginCall') as HTMLInputElement).click();
              }, 200);
  
            } else {
  
              (document.getElementById('loginCall') as HTMLInputElement).click();
  
            }
            
          } else {

            linkType === 'booking' ? 
            this.router.navigateByUrl('/online-consultation?limit=10&skip=0') :
            this.router.navigateByUrl('/patient-panel/patient-dashboard')

          }

          }

      }

      }
      
    } catch (error) {
      console.log(error.message);
    }
  }

  // Dentist Link
  densitRouter(linkType) {
    try {

      if(linkType === 'login' || linkType === 'signup') {

        if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

          (document.getElementById('logoutCall') as HTMLInputElement).click();
          setTimeout(() => {
            (document.getElementById('loginCall') as HTMLInputElement).click();
          }, 200);

        } else {

          (document.getElementById('loginCall') as HTMLInputElement).click();

        }
        this.router.navigateByUrl('/index');

      }

      if(linkType === 'appointment' || linkType === 'doctorDash') {

        if(!localStorage.getItem('token')) {
          
          if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

            (document.getElementById('logoutCall') as HTMLInputElement).click();
            setTimeout(() => {
              (document.getElementById('loginCall') as HTMLInputElement).click();
            }, 200);

          } else {

            (document.getElementById('loginCall') as HTMLInputElement).click();

          }

        } else {

          Constants.credentialsDecrypt(localStorage.getItem('loginAs')) === 'user' ?
          this.toastr.error('You are logged in as a User. Please Login as a Doctor.'): '';

          if(Constants.credentialsDecrypt(localStorage.getItem('loginAs')) !== 'onlineDoctors') {

            if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

              (document.getElementById('logoutCall') as HTMLInputElement).click();
              setTimeout(() => {
                (document.getElementById('loginCall') as HTMLInputElement).click();
              }, 200);
  
            } else {
  
              (document.getElementById('loginCall') as HTMLInputElement).click();
  
            }

          } else {

          const helper = new JwtHelperService();
          const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));
          
          if(isExpired) {
  
            if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

              (document.getElementById('logoutCall') as HTMLInputElement).click();
              setTimeout(() => {
                (document.getElementById('loginCall') as HTMLInputElement).click();
              }, 200);
  
            } else {
  
              (document.getElementById('loginCall') as HTMLInputElement).click();
  
            }
            
          } else {

            linkType === 'doctorDash' ? 
            this.router.navigateByUrl('/doctor-dashboard') :
            this.router.navigateByUrl('/doctors-panel/doctor-appointments')

          }

          }

      }

      }
      
    } catch (error) {
      console.log(error.message);
    }
  }

}
