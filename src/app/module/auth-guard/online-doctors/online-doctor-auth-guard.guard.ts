import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constant';

@Injectable({
  providedIn: 'root'
})
export class OnlineDoctorAuthGuardGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(
    public router: Router,
    public toastr: ToastrService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url: string = state.url;
      return this.verifyLogin();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  verifyLogin():any {
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl('/web-panel/index');
      return false;
    } else if (this.isLoggedIn()) {
      return true;
    }
  }

  public isLoggedIn(): boolean {
    let status = false;

    let token = localStorage.getItem('token');

    if ( token === 'undefined' || token === null || !token) {
      this.toastr.error('Please Login to Continue');
      status = false;
      
    } else {

      Constants.credentialsDecrypt(localStorage.getItem('loginAs')) === 'user' ?
      this.toastr.error('You are logged in as a User. Please Login as a Dentist.'): '';

      if(Constants.credentialsDecrypt(localStorage.getItem('loginAs')) !== 'onlineDoctors') {

        if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

          (document.getElementById('logoutCall') as HTMLInputElement).click();

        }

        status = false;

      } else {

      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(Constants.credentialsDecrypt(localStorage.getItem('token')));
      
      if(isExpired) {

        if((document.getElementById('logoutCall') as HTMLInputElement) !== null) {

          (document.getElementById('logoutCall') as HTMLInputElement).click();

        }

        status = false;
        
      } else {

        status = true;

      }

      }

    }
    return status;
  }


}
