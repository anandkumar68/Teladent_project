import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { IndexComponent } from './index/index.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgOtpInputModule } from  'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { OnlineConsultationComponent } from './online-consultation/online-consultation.component';
import { RouterModule } from '@angular/router';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';
import { InfobytesComponent } from './infobytes/infobytes.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DoctorsPanelModule } from './doctors-panel/doctors-panel.module';
import { DatePipe } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
@NgModule({
  declarations: [
    AppComponent,
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
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgOtpInputModule,
    HttpClientModule,
    RouterModule,
    DoctorsPanelModule,
    TagInputModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
