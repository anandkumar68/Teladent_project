import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactInfoForm: FormGroup;
  submitted = false;
  isSending = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: WebApiService,
    public toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.add('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).setAttribute('style', "left: 297.922px; width: 111.859px;");
    this.formValidation();
  }

  formValidation() {
    this.contactInfoForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^.+@.+\..+$/)
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
      ])),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  // FOR GET VALIDATION ERRORS
  get validation() {
    return this.contactInfoForm.controls;
  }

  // Submit Web Contact Info Form
  onSubmit() {
    try {
      this.isSending = false;
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      this.submitted = true;
      if (this.contactInfoForm.invalid) {
        this.isSending = true;
        return;
      }

      if(this.contactInfoForm.valid) {
        this.apiService.webAddContactInfo(this.contactInfoForm.value).subscribe((resolve) => {

          if(resolve.status === 'success') {
            this.toastr.success(resolve.message);
            this.isSending = true;
            this.contactInfoForm.reset();
            this.submitted = false;
          }

          if(resolve.status === 'error') {
            this.toastr.error(resolve.message);
            this.isSending = true;
          }

        },
        (error) => {
          this.toastr.error(error.message);
          this.isSending = true;
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

}
