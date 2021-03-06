import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CommonFunctionService } from '../shared/common-function.service';
import { ReviewComponent } from './review/review.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { OrderModule } from 'ngx-order-pipe';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // For Simple Loader
  fgsColor: '#00d0f1',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 90,
  fgsType: SPINNER.threeStrings,
  blur: 1,

  // For Background Loader
  bgsColor: '#00d0f1',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsOpacity: 0,


  // For Progress bar
  hasProgressBar: true,
  pbColor: '#00d0f1',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
  masterLoaderId: 'master',

  // logoPosition: "center-center",
  // logoSize: 200,
  // logoUrl: "assets/img/alias-web-loader.gif",
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgOtpInputModule,
    HttpClientModule,
    RouterModule,
    TagInputModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgCircleProgressModule.forRoot(),
    SocialLoginModule,
    OrderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [DatePipe, CommonFunctionService,  
    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1059788798801-7nvvm10dq7afgukkbpst9mia1qi6tfln.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('322828905851181')
        }
      ]
    } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
