import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';
import {
  CountryISO,
  SearchCountryField,
  TooltipLabel,
} from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/shared/constant';
declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('countdown', { static: false })
  private counter: CountdownComponent;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  setCountry: any;
  otp: string;
  timer = 300;

  showHideForm = {
    login: false,
    signup: false,
    otp: false,
    forgotPassword: false,
  };

  // LOGIN FORM
  loginForm: FormGroup;
  loginSubmit = false;

  // SIGNUP FORM
  signupForm: FormGroup;
  signupSubmit = false;

  // FORGOT FORM
  forgotForm: FormGroup;
  forgotSubmit = false;

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
    this.signupFormValidation();
    this.forgotFormValidation();
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

  // FOR SIGNUP FORM VALIDATION
  signupFormValidation() {
    try {
      this.signupForm = this.fb.group(
        {
          phone: new FormControl('', Validators.required),
          name: new FormControl('', Validators.required),
          password: new FormControl(
            '',
            Validators.compose([
              Validators.required,
              Validators.pattern(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
              ),
            ])
          ),
          confirmPassword: new FormControl('', Validators.required),
        },
        {
          validator: Constants.mustMatch('password', 'confirmPassword'),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  // FOR FORGOT-PASSWORD FORM VALIDATION
  forgotFormValidation() {
    try {
      this.forgotForm = this.fb.group({
        phone: new FormControl('', Validators.required),
      });
    } catch (error) {
      console.error(error);
    }
  }

  // FOR LOGIN FORM VALIDATION ERRORS
  get loginValidation() {
    return this.loginForm.controls;
  }

  // FOR SIGNUP FORM VALIDATION ERRORS
  get signupValidation() {
    return this.signupForm.controls;
  }

  // FOR FORGOT FORM VALIDATION ERRORS
  get forgotValidation() {
    return this.forgotForm.controls;
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

  // FOR SUBMIT SIGNUP FORM
  submitSignup() {
    try {
      this.signupSubmit = true;
      if (this.signupForm.invalid) {
        this.toastr.error('All fields are required');
        return;
      }
      if (this.signupForm.valid) {
        console.log(this.signupForm.value);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR SUBMIT FORGOT FORM
  submitForgot() {
    try {
      this.forgotSubmit = true;
      if (this.forgotForm.invalid) {
        this.toastr.error('All fields are required');
        return;
      }
      if (this.forgotForm.valid) {
        console.log(this.forgotForm.value);
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
      this.loginForm.reset();
      this.loginSubmit = false;
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
      this.signupForm.reset();
      this.signupSubmit = false;
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
      this.forgotForm.reset();
      this.forgotSubmit = false;
    } catch (error) {
      console.error(error);
    }
  }

  // CHECK TIMER EVENT WHEN START OR CLOSE
  handleEvent($event) {
    try {
      if ($event.action === 'done' && $event.text === '00:00') {
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // SUBMIT OTP DETAILS
  submitOtp() {
    try {
      if (this.otp.length > 6) {
        this.toastr.error('Invalid OTP');
      }
      if (this.otp.length === 6) {
        console.log(this.otp);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
