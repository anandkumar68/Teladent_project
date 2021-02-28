
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

@Injectable()
export class Constants {

  public static password = 'watchingyou';
  public router: Router;
  constructor() { }

  // public static API_URL = environment.apiBaseUrl;

  // Validations
  // public static EMAIL_PATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  public static EMAIL_PATTERN = /^.+@.+\..+$/;
  // public static PHONE_PATTERN = /^(\+91)?(\d{10}|\w)$/;
  public static PHONE_PATTERN = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  public static YEAR_PATTERN = /^(19|20)\d{2}$/;
  public static ZIPCODE_PATTERN = '^[0-9]{5,6}$';
  // public static PHONE_PATTERN =  /(\+91(-)?|91(-)?|0(-)?)?(9)[0-9]{6}$/;


  public static PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;

  // For print Validation and error message.
  public static validationErrorMessage = {
    username: [
      { type: 'required', message: 'Username cannot be blank.' },
    ],
    password: [
      { type: 'required', message: 'Password cannot be blank.' },
    ],
    email: [
      { type: 'required', message: 'Email  is required' },
      { type: 'pattern', message: 'Invalid Email' },
    ],
  };


  public static credentialsEncrypt(userId) {
    try {
      const encryptOutput = CryptoJS.AES.encrypt(userId.trim(), this.password.trim()).toString();
      return encryptOutput;
    } catch (error) {
      console.log(error.message);
    }
  }

  public static credentialsDecrypt(userId) {
    try {
      const decryptOutput = CryptoJS.AES.decrypt(userId.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
      return decryptOutput;
    } catch (error) {
      console.log(error.message);
    }
  }

  // FOR ADD INDEX IN API DATA
  public static addIndex(data) {
    try {

      let sortData = data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      let allData = [];

      for (let [i, v] of sortData.entries()) {
        v['index'] = i + 1;
        allData.push(v);
      }

      return allData;
    } catch (error) {
      console.log(error);
    }
  }

  // FOR COMPARE PASSWORDS
  public static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // FOR FORM WHITESPACE VALIDATION
  public static noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return of(isValid ? null : { whitespace: true });
  }


  public static cleanForm(formGroup: FormGroup) {  
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    return formGroup;
  }


}