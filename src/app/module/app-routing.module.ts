import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { IndexComponent } from './index/index.component';
import { InfobytesComponent } from './infobytes/infobytes.component';
import { OnlineConsultationComponent } from './online-consultation/online-consultation.component';

const routes: Routes = [
      {
        path:'index',
        component: IndexComponent,
      },
      {
        path:'online-consultation',
        component: OnlineConsultationComponent,
      },
      {
        path:'doctor-profile',
        component: DoctorProfileComponent,
      },
      {
        path:'booking/:providerId',
        component: BookingComponent,
      },
      {
        path:'checkout',
        component: CheckoutComponent,
      },
      {
        path:'booking-confirm',
        component: BookingConfirmComponent,
      },
      {
        path:'about-us',
        component: AboutUsComponent,
      },
      {
        path:'info-bytes',
        component: InfobytesComponent,
      },
      {
        path:'contact-us',
        component: ContactUsComponent,
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch:'full',
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
