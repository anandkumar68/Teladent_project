import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {
    path: 'web-panel',
    loadChildren: () => import('./web/web.module').then(m => m.WebModule),
  },
  {
    path: '',
    redirectTo: 'web-panel',
    pathMatch: 'full',
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: 'web-review/:appointId',
    component: ReviewComponent,
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
