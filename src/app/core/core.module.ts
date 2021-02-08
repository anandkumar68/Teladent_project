import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule
  ],
  exports:[HeaderComponent, FooterComponent]
})
export class CoreModule { }
