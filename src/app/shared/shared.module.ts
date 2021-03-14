import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './components/login-modal/login-modal.component';



@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule
  ],
  exports:[LoginModalComponent]
})
export class SharedModule { }
