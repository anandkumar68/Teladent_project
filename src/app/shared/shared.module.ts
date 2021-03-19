import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModalService } from './components/login-modal/login-modal.service';



@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[LoginModalComponent],
  providers:[LoginModalService]
})
export class SharedModule { }
