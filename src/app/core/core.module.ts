import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    NgOtpInputModule
  ],
  exports:[HeaderComponent, FooterComponent]
})
export class CoreModule { }
