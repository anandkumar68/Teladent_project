import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { OnlineConsultGuard } from '../auth-guard/online-consult/online-consult.guard';
import { BlogComponent } from '../blog/blog.component';
import { BookAnAppointmentComponent } from '../book-an-appointment/book-an-appointment.component';
import { BookingConfirmComponent } from '../booking-confirm/booking-confirm.component';
import { BookingComponent } from '../booking/booking.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { CovidComponent } from '../covid/covid.component';
import { DoctorProfileComponent } from '../doctor-profile/doctor-profile.component';
import { IndexComponent } from '../index/index.component';
import { InfobytesComponent } from '../infobytes/infobytes.component';
import { OnlineConsultationComponent } from '../online-consultation/online-consultation.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { WebComponent } from './web.component';

const routes: Routes = [
  {
    path:'',
    component:WebComponent,
    children:[
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'online-consultation',
        component: OnlineConsultationComponent,
        canActivate:[OnlineConsultGuard]
      },
      {
        path: 'doctor-profile/:doctorId',
        component: DoctorProfileComponent,
      },
      {
        path: 'booking/:providerId',
        component: BookingComponent,
        canActivate:[OnlineConsultGuard]
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate:[OnlineConsultGuard]
      },
      {
        path: 'booking-confirm',
        component: BookingConfirmComponent,
        canActivate:[OnlineConsultGuard]
      },
      {
        path: 'book-an-appointment',
        component: BookAnAppointmentComponent,
        canActivate:[OnlineConsultGuard]
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'info-bytes',
        component: InfobytesComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'covid-guidelines',
        component: CovidComponent,
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'doctors-panel',
        loadChildren: () => import('../doctors-panel/doctors-panel.module').then(m => m.DoctorsPanelModule),
      },
      {
        path: '',
        redirectTo: 'doctors-panel',
        pathMatch: 'full',
      },
    
      {
        path: 'patient-panel',
        loadChildren: () => import('../patient-panel/patient-panel.module').then(m => m.PatientPanelModule),
      },
      {
        path: '',
        redirectTo: 'patient-panel',
        pathMatch: 'full',
      },
      {
        path:'blog/:blogId',
        component: BlogComponent
      },
      {
        path:'blog',
        component: BlogComponent
      },
    ]
  },



  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
