import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  BASE_URL = environment.apiBaseUrl;

  constructor(public http: HttpClient) { }

  // USER DOCTOR API LIST
  getUserDoctorlist(data: { limit: any; skip: any; gender: any; speciality: any; }): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/doctor-list?limit=${data.limit}&skip=${data.skip}&gender=${data.gender}&speciality=${data.speciality}`;
      return this.http.get(apiUrl);
    } catch (error) {
      console.log(error.message);
    }
  }

  // USER DOCTOR API SPECIALIST LIST
  getUserSpecialistDoctorlist(): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/doctor-specialiist-list`;
      return this.http.get(apiUrl);
    } catch (error) {
      console.log(error.message);
    }
  }

  // GET AVAILABLE SLOTS
  getDoctorAvailableSlot(): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/available-time-slot`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Doctor Details
  getDoctorDetails(doctorId: any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/individual-details/${doctorId}`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  createOrderId(data: { amount: any; currency: string; doctorId: any; }): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/create-razor-order-id`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  verfiyPaymentSignature(data: { razorOrderId: any; razorPayId: any; razorSignature: any; sessionValue: any; }): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/user/verify-razor-payment-signature`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }



  /********************************* FOR DOCTOR APPOINTMENT **********************/

  // USER DOCTOR API LIST
  getDoctorAppiontmentlist(limit:any, skip:any): Observable<any> {
    try {
      let token: any;
      token = localStorage.getItem('token');
      const apiUrl = `${this.BASE_URL}/doctor/get-appointments`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${Constants.credentialsDecrypt(token)}`),
        params: new HttpParams().set('limit', limit).set('skip', skip)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

}
