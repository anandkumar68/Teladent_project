import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../constant';
import { UserApiService } from '../../user-api/user-api.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  setCountry: any;

  @Input() link: string;
  @Output() myClick = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onOk = new EventEmitter();
  private backdrop: HTMLElement;
  style: any;
  // LOGIN FORM
  loginForm: FormGroup;
  loginSubmit = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public fb: FormBuilder,
    private toastr: ToastrService,
    public api: UserApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginFormValidation();
  }

  okClicked() {
    this.onOk.emit();
  }

  cancelClicked() {
    this.onCancel.emit();
  }


  show() {
    document.getElementsByTagName("BODY")[0].classList.add('modal-open');
    // this.document.body.classList.add('modal-open');
    this.style = { 'display': 'block' };
    this.showBackdrop();
  }

  hide() {
    this.document.body.classList.remove('modal-open');
    this.style = { 'display': 'none' };
    this.hideBackdrop();
  }


  showBackdrop() {
    this.backdrop = this.document.createElement('div');
    this.backdrop.classList.add('modal-backdrop');
    this.backdrop.classList.add('show');
    this.document.body.appendChild(this.backdrop);
  }

  hideBackdrop() {
    this.backdrop.remove();
  }

  // FOR SUBMIT LOGIN FORM
  submitLogin() {
    try {
      this.loginSubmit = true;
      if (this.loginForm.invalid) {
        return;
      }
      if (this.loginForm.valid) {
        let data = {
          username: this.loginForm
            .get('phone')
            .value.e164Number.replace(
              this.loginForm.get('phone').value.dialCode,
              ''
            ),
          countryCode: this.loginForm.get('phone')?.value.dialCode.substr(1),
          password: this.loginForm.get('password')?.value.trim(),
        };
        this.api.userLoginApi(data).subscribe(
          (response) => {
            if (response.status === 'success') {
              this.toastr.success(response.message);
              localStorage.setItem('userId', Constants.credentialsEncrypt(response.data.userId));
              localStorage.setItem('user', Constants.credentialsEncrypt(JSON.stringify(response.data)));
              localStorage.setItem('token', Constants.credentialsEncrypt(response.data.token));
              localStorage.setItem('loginAs', Constants.credentialsEncrypt(response.data.userType));
              // this.showUser = true;
              // this.loginUserDetails();
              (document.getElementById('closeModal') as HTMLElement).click();
            }

            if (response.status === 'error') {
              this.toastr.error(response.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR LOGIN FORM VALIDATION ERRORS
  get loginValidation() {
    return this.loginForm.controls;
  }



  // FOR SIGNUP
  signup() {
    try {

    } catch (error) {
      console.error(error);
    }
  }


  // FOR LOGIN FORM VALIDATION
  loginFormValidation() {
    try {
      this.loginForm = this.fb.group({
        phone: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      });
    } catch (error) {
      console.error(error);
    }
  }
}


