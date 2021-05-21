import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-oral-self-asessment',
  templateUrl: './oral-self-asessment.component.html',
  styleUrls: ['./oral-self-asessment.component.css']
})
export class OralSelfAsessmentComponent implements OnInit {

  step: any = 1;

  tabSteps = {
    step1: true,
    step2: false,
    step3: false,
  }

  currentSteps: any;


  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  oralModalForm: FormGroup;
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
  ngOnInit(): void {
    this.oralModalForm = this.formBuilder.group({
      name: new FormControl(),
      number: new FormControl(),
      email: new FormControl(),
      agenumber: new FormControl(),
    });
    this.currentSteps = 'step1';


  }

  onSubmit() { }


  changeSteps(value: any) {
    try {
      this.currentSteps = value;
      if (value === 'step1') {
        this.tabSteps.step1 = true;
        this.tabSteps.step2 = false;
        this.tabSteps.step3 = false;
      }
      if (value === 'step2') {
        this.tabSteps.step1 = false;
        this.tabSteps.step2 = true;
        this.tabSteps.step3 = false;

      }
      if (value === 'step3') {
        this.tabSteps.step1 = false;
        this.tabSteps.step2 = false;
        this.tabSteps.step3 = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  changeBtnSteps(value: any) {
    try {
      if (value === 'next') {
        if (this.currentSteps === 'step1') {
          this.changeSteps('step2')
        } else if (this.currentSteps === 'step2') {
          this.changeSteps('step3')
        }
      }
      if (value === 'pre') {
        if (this.currentSteps === 'step3') {
          this.changeSteps('step2')
        } else if (this.currentSteps === 'step2') {
          this.changeSteps('step1')
        }
      }

    } catch (error) {
      console.error(error);

    }
  }


}
