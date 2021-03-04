import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CovidComponent } from './covid/covid.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { IndexComponent } from './index/index.component';
import { InfobytesComponent } from './infobytes/infobytes.component';
import { OnlineConsultationComponent } from './online-consultation/online-consultation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'online-consultation',
    component: OnlineConsultationComponent,
  },
  {
    path: 'doctor-profile/:doctorId',
    component: DoctorProfileComponent,
  },
  {
    path: 'booking/:providerId',
    component: BookingComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'booking-confirm',
    component: BookingConfirmComponent,
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
    loadChildren: () => import('./doctors-panel/doctors-panel.module').then(m => m.DoctorsPanelModule),
  },
  {
    path: '',
    redirectTo: 'doctors-panel',
    pathMatch: 'full',
  },

  {
    path: 'patient-panel',
    loadChildren: () => import('./patient-panel/patient-panel.module').then(m => m.PatientPanelModule),
  },
  {
    path: '',
    redirectTo: 'patient-panel',
    pathMatch: 'full',
  },

  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path:'page-not-found/:status',
    component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
