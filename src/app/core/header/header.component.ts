import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CountryISO,
  SearchCountryField,
  TooltipLabel,
} from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  setCountry: any;
  otp: string;

  showHideForm = {
    login: false,
    signup: false,
    otp: false,
    forgotPassword: false,
  };

  // LOGIN FORM
  loginForm: FormGroup;
  loginSubmit = false;

  constructor(public fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {
    window.onscroll = function () {
      myFunction();
    };

    var header = document.getElementById('mainHeader');
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }

    var tabs = $('.tabs');
    var activeItem = tabs.find('.active');
    var activeWidth = activeItem.innerWidth();
    $('.selector').css({
      left: activeItem.position.left + 'px',
      width: activeWidth + 'px',
    });

    $('.tabs').on('click', 'a', function (e) {
      e.preventDefault();
      $('.tabs a').removeClass('active');
      $(this).addClass('active');
      var activeWidth = $(this).innerWidth();
      var itemPos = $(this).position();
      $('.selector').css({
        left: itemPos.left + 'px',
        width: activeWidth + 'px',
      });
    });

    this.setCountry = CountryISO.India;
    this.login();
    this.loginFormValidation();
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

  // FOR LOGIN FORM VALIDATION ERRORS
  get loginValidation() {
    return this.loginForm.controls;
  }

  // FOR SUBMIT LOGIN FORM
  submitLogin() {
    try {
      this.loginSubmit = true;
      if (this.loginForm.invalid) {
        this.toastr.error('All fields are required');
        return;
      }
      if (this.loginForm.valid) {
        console.log(this.loginForm.value);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  // FOR LOGIN
  login() {
    try {
      this.showHideForm.login = true;
      this.showHideForm.signup = false;
      this.showHideForm.otp = false;
      this.showHideForm.forgotPassword = false;
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SIGNUP
  signup() {
    try {
      this.showHideForm.login = false;
      this.showHideForm.signup = true;
      this.showHideForm.otp = false;
      this.showHideForm.forgotPassword = false;
    } catch (error) {
      console.error(error);
    }
  }

  // FOR OTP
  showOtp() {
    try {
      this.showHideForm.login = false;
      this.showHideForm.signup = false;
      this.showHideForm.otp = true;
      this.showHideForm.forgotPassword = false;
    } catch (error) {
      console.error(error);
    }
  }

  // FOR FORGOT PASSWORD
  forgotPassword() {
    try {
      this.showHideForm.login = false;
      this.showHideForm.signup = false;
      this.showHideForm.otp = false;
      this.showHideForm.forgotPassword = true;
    } catch (error) {
      console.error(error);
    }
  }
}
