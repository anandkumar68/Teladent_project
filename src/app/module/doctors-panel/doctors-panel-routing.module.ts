import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorsPanelComponent } from './doctors-panel.component';

const routes: Routes = [
  {
    path:'',
    component: DoctorsPanelComponent,
    // canActivate:[AuthGuard],
    children: [
      {
        path:'doctor-dashboard',
        component: DoctorDashboardComponent,
      },
      {
        path:'doctor-appointments',
        component: AppointmentsComponent,
      },
      {
        path: '',
        redirectTo: 'doctor-dashboard',
        pathMatch:'full',
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsPanelRoutingModule { }
