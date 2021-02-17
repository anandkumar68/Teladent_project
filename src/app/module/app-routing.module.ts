import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { IndexComponent } from './index/index.component';
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
