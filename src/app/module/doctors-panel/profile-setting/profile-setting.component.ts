import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/shared/constant';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {

  addDoctorForm: FormGroup | any;
  submitted = false;

  showPrice = false;
  services = [];
  specialization = [];
  dentistType = [];

  showServiceError!: boolean;
  showSpecializationError!: boolean;
  showDentistTypeError!: boolean;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  setCountry: any;



  constructor(
    private fb: FormBuilder,
    public datePipe: DatePipe,
    // public ngxLoader: NgxUiLoaderService,
    public toastr: ToastrService,
    // public api: AdminApiService,
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.formValidation();
  }

  // FOR FORM VALIDATION
  formValidation() {
    try {
      this.setCountry = CountryISO.India;
      this.addDoctorForm = this.fb.group({
        services: new FormControl(''),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        gender: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(Constants.ZIPCODE_PATTERN)
        ])),
        addressLine1: new FormControl('', Validators.required),
        addressLine2: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        biography: new FormControl('', Validators.required),
        pricingType: new FormControl('Free', Validators.required),
        priceCharges: new FormControl('0', Validators.required),

        education: this.fb.array([
          this.fb.group({
            degree: new FormControl(''),
            collegName: new FormControl(''),
            fromYear: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
            completionYear: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN))
          })
        ]),
        experience: this.fb.array([
          this.fb.group({
            hospitalName: new FormControl(''),
            from: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
            to: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
          })
        ]),
        awards: this.fb.array([
          this.fb.group({
            name: new FormControl(''),
            year: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
          })
        ]),
        registrations: this.fb.array([
          this.fb.group({
            name: new FormControl(''),
            year: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
          })
        ]),
        membership: this.fb.array([
          this.fb.control('')
        ])
      });
    } catch (error) {
      console.error(error);
    }
  }


  // FOR GET VALIDATION ERRORS
  get validation() {
    return this.addDoctorForm.controls;
  }

  // FOR ADD DYNAMIC INPUT
  addNewGroup(formValue: any) {
    const add = this.addDoctorForm.get(formValue) as FormArray;
    if (formValue === 'education') {
      add.push(this.fb.group({
        degree: new FormControl(''),
        collegName: new FormControl(''),
        fromYear: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
        completionYear: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN))
      }))
    }

    if (formValue === 'experience') {
      add.push(this.fb.group({
        hospitalName: new FormControl(''),
        from: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
        to: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN))
      }))
    }

    if (formValue === 'awards') {
      add.push(this.fb.group({
        name: new FormControl(''),
        year: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
      }))
    }

    if (formValue === 'registrations') {
      add.push(this.fb.group({
        name: new FormControl(''),
        year: new FormControl('', Validators.pattern(Constants.YEAR_PATTERN)),
      }))
    }

    if (formValue === 'membership') {
      add.push(this.fb.control(''))
    }
  }


  // FOR GET MEMBERSHIP INPUT VALUE IN ARRAY
  get membership(): FormArray | any {
    try {
      return this.addDoctorForm.get('membership') as FormArray;
    } catch (error) {
      console.log(error.message);
    }

  }

  // FOR DELETE GROUP DYNAMICALLY
  deleteAddressGroup(index: number, formValue: any) {
    const add = this.addDoctorForm.get(formValue) as FormArray;
    add.removeAt(index)
  }


  submitForm(): any {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      this.submitted = true;
      this.checkInput();
      if (this.addDoctorForm.invalid) {
        return;
      }
      if (this.addDoctorForm.valid) {
        if (this.showSpecializationError === false && this.showServiceError === false && this.showDentistTypeError === false) {

          let servicesData = [];
          for (let data of this.services) {
            servicesData.push(data['value'])
          }


          let specializationData= [];
          for (let data of this.specialization) {
            specializationData.push(data['value'])
          }


          let dentistTypeData= [];
          for (let data of this.dentistType) {
            dentistTypeData.push(data['value'])
          }
          let data = {
            "firstName": this.addDoctorForm.get('firstName')?.value.trim(),
            "lastName": this.addDoctorForm.get('lastName')?.value.trim(),
            "phone": this.addDoctorForm.get('phone')?.value.e164Number.replace(this.addDoctorForm.get('phone').value.dialCode, ''),
            "dob": this.datePipe.transform(this.addDoctorForm.get('dob')?.value, 'yyyy-MM-dd'),
            "gender": this.addDoctorForm.get('gender')?.value.trim(),
            "zipcode": this.addDoctorForm.get('zipcode')?.value.trim(),
            "addressLine1": this.addDoctorForm.get('addressLine1')?.value.trim(),
            "addressLine2": this.addDoctorForm.get('addressLine2')?.value.trim(),
            "city": this.addDoctorForm.get('city')?.value.trim(),
            "state": this.addDoctorForm.get('state')?.value.trim(),
            "country": this.addDoctorForm.get('country')?.value.trim(),
            "countryCode": this.addDoctorForm.get('phone')?.value.dialCode.substr(1),
            "biography": this.addDoctorForm.get('biography')?.value.trim(),
            "pricingType": this.addDoctorForm.get('pricingType')?.value,
            "priceCharges": this.addDoctorForm.get('priceCharges')?.value,
            "services": servicesData,
            "specialization": specializationData,
            "dentistType": dentistTypeData,
            "membership": this.addDoctorForm.get('membership')?.value,
            "education": this.addDoctorForm.get('education')?.value,
            "experience": this.addDoctorForm.get('experience')?.value,
            "awards": this.addDoctorForm.get('awards')?.value,
            "registrations": this.addDoctorForm.get('registrations')?.value,
          }
          // this.ngxLoader.start();
          // this.api.addDoctorApi(data).subscribe((res: any) => {
          //   this.ngxLoader.stop();
          //   if (res.status === 'success') {
          //     this.toastr.success(res.message);
          //     this.router.navigateByUrl('/admin/doctors-list');
          //   }
          //   if (res.status === 'error') {
          //     this.toastr.error(res.message);
          //   }
          // }, (error: any) => {
          //   console.log(error);
          //   this.ngxLoader.stop();
          // });

        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR GET DATE VALUE
  onDateSelect(event: any) {
    try {
      if (event == 'Invalid Date') {
        this.addDoctorForm.get('dob')?.setErrors({ invalidDate: true });
      } else {
        this.addDoctorForm.get('dob')?.updateValueAndValidity();
      }
    } catch (error) {
      console.error(error);
    }
  }


  // ON RADIO BUTTON SELECT
  handleChange(event: any) {
    try {
      let type = event.target.value;
      if (type === 'Custom Price') {
        this.addDoctorForm.get('priceCharges')?.setValue('')
        this.showPrice = true;
      }

      if (type === 'Free') {
        this.addDoctorForm.get('priceCharges')?.setValue('0')
        this.showPrice = false;

      }
    } catch (error) {
      console.error(error);
    }
  }

  // FOR CHECK NGX CHIPS INPUT
  checkInput() {
    try {
      if (this.services.length === 0) {
        this.showServiceError = true;
      } else {
        this.showServiceError = false;
      }

      if (this.specialization.length === 0) {
        this.showSpecializationError = true;
      } else {
        this.showSpecializationError = false;
      }

      if (this.dentistType.length === 0) {
        this.showDentistTypeError = true;
      } else {
        this.showDentistTypeError = false;
      }

    } catch (error) {
      console.error(error);
    }
  }

  // AFTER CHIPS REMOVED
  onRemoveChips(tag: any, attrTyp: any) {

    attrTyp === 'service' ? 
    this.services.length === 0 ?
    this.showServiceError = true : this.showServiceError = false :
    attrTyp === 'special' ? 
    this.specialization.length === 0 ? 
    this.showSpecializationError = true : this.showSpecializationError = false :
    attrTyp === 'dentist' ?
    this.dentistType.length === 0 ?
    this.showDentistTypeError = true : this.showDentistTypeError = false : '' ;
  }

  // AFTER CHIPS ADDED
  onAddChips(tag: any, attrTyp: any) {

    attrTyp === 'service' ? 
    this.showServiceError = false : 
    attrTyp === 'special' ? 
    this.showSpecializationError = false : 
    attrTyp === 'dentist' ? 
    this.showDentistTypeError = false : '';

  }


}