import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { BookingConfirmComponent } from '../booking-confirm/booking-confirm.component';
import { BookingComponent } from '../booking/booking.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ComingsoonComponent } from '../comingsoon/comingsoon.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { CovidComponent } from '../covid/covid.component';
import { DoctorProfileComponent } from '../doctor-profile/doctor-profile.component';
import { IndexComponent } from '../index/index.component';
import { InfobytesComponent } from '../infobytes/infobytes.component';
import { OnlineConsultationComponent } from '../online-consultation/online-consultation.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgOtpInputModule } from 'ng-otp-input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TagInputModule } from 'ngx-chips';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from 'src/app/core/core.module';
import { DoctorsPanelModule } from '../doctors-panel/doctors-panel.module';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { BlogComponent } from '../blog/blog.component';
import { BookAnAppointmentComponent } from '../book-an-appointment/book-an-appointment.component';
import { OralSelfAsessmentComponent } from '../oral-self-asessment/oral-self-asessment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentResultComponent } from '../assessment-result/assessment-result.component';
import { TermConditionsComponent } from '../term-conditions/term-conditions.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // For Simple Loader
  fgsColor: '#00d0f1',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 90,
  fgsType: SPINNER.threeStrings,
  blur:1,

  // For Background Loader
  bgsColor: '#00d0f1',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsOpacity: 0,


  // For Progress bar
  hasProgressBar: true,
  pbColor: '#00d0f1',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
  masterLoaderId: 'master',

  // logoPosition: "center-center",
  // logoSize: 200,
  // logoUrl: "assets/img/alias-web-loader.gif",
};
@NgModule({
  declarations: [
    WebComponent,
    IndexComponent,
    OnlineConsultationComponent,
    DoctorProfileComponent,
    BookingComponent,
    CheckoutComponent,
    BookingConfirmComponent,
    AboutUsComponent,
    ComingsoonComponent,
    InfobytesComponent,
    ContactUsComponent,
    CovidComponent,
    WebComponent,
    BlogComponent,
    BookAnAppointmentComponent,
    OralSelfAsessmentComponent,
    AssessmentResultComponent,
    TermConditionsComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    CoreModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgOtpInputModule,
    HttpClientModule,
    RouterModule,
    DoctorsPanelModule,
    TagInputModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgCircleProgressModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule,
    ReactiveFormsModule

  ]
})
export class WebModule { }

