import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  BASE_URL = environment.apiBaseUrl;

  constructor(public http: HttpClient) {}

  // SUBMIT USER REGISTER API
  // userRegisterApi(data): Observable<any> {
  //   try {
  //     const apiUrl = `${this.BASE_URL}/user/signup`;
  //     return this.http.post(apiUrl, data,{
  //       headers: new HttpHeaders()
  //       .set('Authorization', `Bearer ${Constants.credentialsDecrypt(localStorage.getItem('token'))}`),
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

}
