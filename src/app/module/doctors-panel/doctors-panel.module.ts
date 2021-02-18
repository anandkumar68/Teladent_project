import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsPanelRoutingModule } from './doctors-panel-routing.module';
import { DoctorsPanelComponent } from './doctors-panel.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';


@NgModule({
  declarations: [
    DoctorsPanelComponent,
    DoctorDashboardComponent,
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    DoctorsPanelRoutingModule
  ]
})
export class DoctorsPanelModule { }
