import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
