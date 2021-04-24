import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModal } from 'src/app/shared/components/login-modal/login-modal';
import { LoginModalService } from 'src/app/shared/components/login-modal/login-modal.service';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
import { Constants } from 'src/app/shared/constant';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  webBlogDetails = [];
  modelData = new LoginModal();

  constructor(
    private apiService: WebApiService,
    private router: Router,
    private loginModalService: LoginModalService,
    public toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    (document.getElementById('home') as HTMLAnchorElement).classList.add('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).setAttribute('style', "left: 0px; width: 78.7812px;");
    this.blogDetails();
  }

  blogDetails() {
    try {
      
      this.apiService.blogDetailsWeb(0,4).subscribe((resolve: any) => {

        if(resolve.status === 'success') {

          this.webBlogDetails = resolve.data.list;

        }

      })

    } catch (error) {
      console.log(error.message);
    }
  }

  blogRouting(blogId: any) {
    this.router.navigateByUrl(`/web-panel/blog/${blogId}`)
  }

  viewBlogRoute() {
    this.router.navigateByUrl(`/web-panel/blog`)
  }

  // Patient Link
  patientRouter(linkType, modalType: string, content: string, allowUser: String) {
    try {

      if (linkType === 'online') {

        if (!localStorage.getItem('token')) {

          if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

            (document.getElementById('logoutCall') as HTMLInputElement).click();

          }

          this.modelData.type = modalType;
          this.modelData.content = content;
          this.modelData.allowUser = allowUser;
          this.loginModalService.open(this.modelData);

        } else {

          Constants.credentialsDecrypt(localStorage.getItem('loginAs')) === 'onlineDoctors' ?
            this.toastr.error('You are logged in as a Doctor. Please Login as a User.') : '';

          if (Constants.credentialsDecrypt(localStorage.getItem('loginAs')) !== 'user') {

            if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

              (document.getElementById('logoutCall') as HTMLInputElement).click();

            }

            this.modelData.type = modalType;
            this.modelData.content = content;
            this.modelData.allowUser = allowUser;
            this.loginModalService.open(this.modelData);

          } else {

            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));

            if (isExpired) {

              if ((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

                (document.getElementById('logoutCall') as HTMLInputElement).click();

              }

              this.modelData.type = modalType;
              this.modelData.content = content;
              this.modelData.allowUser = allowUser;
              this.loginModalService.open(this.modelData);

            } else {

              this.router.navigateByUrl('/web-panel/online-consultation?limit=10&skip=0');

            }

          }

        }

      }

    } catch (error) {
      console.log(error.message);
    }
  }

}
