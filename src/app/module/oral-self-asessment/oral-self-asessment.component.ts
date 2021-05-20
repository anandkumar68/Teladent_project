import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-oral-self-asessment',
  templateUrl: './oral-self-asessment.component.html',
  styleUrls: ['./oral-self-asessment.component.css']
})
export class OralSelfAsessmentComponent implements OnInit {

  title = 'angulartoastr';

  step: any = 1;

  
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  oralModalForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  show() {
    this.showModal = true; // Show-Hide Modal Check
    const body = document.body;
    body.style.height = '100vh';
    body.style.overflowY = 'hidden';
    (document.getElementById('mainHeader') as HTMLElement).classList.remove('sticky');

  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
    const body = document.body;
    body.style.height = 'auto';
    body.style.overflowY = 'scroll';
    (document.getElementById('mainHeader') as HTMLElement).classList.add('sticky');
    
  }
  ngOnInit():void {
   this.oralModalForm = this.formBuilder.group({
     name:new FormControl(),
     number:new FormControl(),
     email:new FormControl(),
     agenumber:new FormControl(),
   })
  }
 
  onSubmit() {
   

  }

}
