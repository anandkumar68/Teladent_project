import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites.component';
import { PatientChangePasswordComponent } from './patient-change-password/patient-change-password.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientPanelComponent } from './patient-panel.component';
import { PatientProfileSettingsComponent } from './patient-profile-settings/patient-profile-settings.component';

const routes: Routes = [
  {
    path:'',
    component: PatientPanelComponent,
    // canActivate:[AuthGuard],
    children: [
      {
        path:'patient-dashboard',
        component: PatientDashboardComponent,
      },
      {
        path:'favourites',
        component: FavouritesComponent,
      },
      {
        path:'patient-profile-setting',
        component: PatientProfileSettingsComponent,
      },
      {
        path:'patient-change-password',
        component: PatientChangePasswordComponent,
      },
      {
        path: '',
        redirectTo: 'patient-dashboard',
        pathMatch:'full',
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientPanelRoutingModule { }
