import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';

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
  allowForSubmission = false;
  previousLabel = {
    question1: false,
    question2: false,
    question3: false,
    question4: false
  };

  stepData = {

    checked: {
      step1: {
        question1: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          },
          label4: {
            checkedValue: false
          },
        },
        question2: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          },
          label4: {
            checkedValue: false
          },
        },
        question3: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          },
          label4: {
            checkedValue: false
          },
        },
        question4: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          },
          label4: {
            checkedValue: false
          },
        }
      },
      step2: {
        question1: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          },
          label4: {
            checkedValue: false
          },
          label5: {
            checkedValue: false
          },
        },
        question2: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          },
          label4: {
            checkedValue: false
          },
          label5: {
            checkedValue: false
          },
        },
        question3: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          },
          label4: {
            checkedValue: false
          },
          label5: {
            checkedValue: false
          },
        },
        question4: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          },
          label4: {
            checkedValue: false
          },
          label5: {
            checkedValue: false
          },
        }
      },
      step3: {
        question1: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          }
        },
        question2: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          }
        },
        question3: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          }
        },
        question4: {
          label1: {
            checkedValue: false
          },
          label2: {
            checkedValue: false
          },
          label3: {
            checkedValue: false
          }
        }
      }
    },

    value: {
      step1: {
        question1: {
          value: 0,
          isChecked: false
        },
        question2: {
          value: 0,
          isChecked: false
        },
        question3: {
          value: 0,
          isChecked: false
        },
        question4: {
          value: 0,
          isChecked: false
        }
      },
      step2: {
        question1: {
          value: 0,
          isChecked: false
        },
        question2: {
          value: 0,
          isChecked: false
        },
        question3: {
          value: 0,
          isChecked: false
        },
        question4: {
          value: 0,
          isChecked: false
        }
      },
      step3: {
        question1: {
          value: 0,
          isChecked: false
        },
        question2: {
          value: 0,
          isChecked: false
        },
        question3: {
          value: 0,
          isChecked: false
        },
        question4: {
          value: 0,
          isChecked: false
        }
      }
    }
  }


  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private apiService: WebApiService,
    private router: Router
  ) { }
  show() {

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    let step3Question = JSON.stringify(this.stepData.value.step3);
    if (step3Question.search('false') > -1) {
      this.toastr.error('Please give all questions answer.')
    } else {
      this.showModal = true; // Show-Hide Modal Check
      const body = document.body;
      body.style.height = '100vh';
      body.style.overflowY = 'hidden';
      (document.getElementById('mainHeader') as HTMLElement).classList.remove('sticky');
    }

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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).setAttribute('style', "left: 0px; width: 78.7812px;");
    this.oralModalForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^.+@.+\..+$/)
      ])),
      agenumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^([0-9]|[1-9][0-9]|100)$/)
      ])),
      gender: new FormControl('', Validators.required),
    });
    this.currentSteps = 'step1';


  }

  onSubmit() { 
    console.log("Pratsatd")
    this.submitted = true;
      if (this.oralModalForm.invalid) {
        return;
      }

      if(this.oralModalForm.valid) {
        let data = this.oralModalForm.value;
        data.value = this.stepData.value;
        this.apiService.addOralAssesment(data).subscribe((resolve) => {
          if(resolve.status === 'success') {
            this.toastr.success(resolve.message);
            this.router.navigateByUrl(`/web-panel/assessment-result/${resolve.data}`)
          }

          if(resolve.status === 'error') {
            this.toastr.error(resolve.message);
          }

        },
        (error) => {
          this.toastr.error(error.message);
        })
      }
  }


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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    try {

      if (value === 'next') {
        if (this.currentSteps === 'step1') {

          let step1Question = JSON.stringify(this.stepData.value.step1);
          if (step1Question.search('false') > -1) {
            this.toastr.error('Please give all questions answer.')
          } else {
            this.changeSteps('step2');
          }


        } else if (this.currentSteps === 'step2') {

          let step2Question = JSON.stringify(this.stepData.value.step2);
          if (step2Question.search('false') > -1) {
            this.toastr.error('Please give all questions answer.')
          } else {
            this.changeSteps('step3');
          }

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


  step1(activeId, labelId, forStep, forQuestion, forLabel) {
    try {

      for (let key in this.stepData['checked'][forStep][forQuestion]) {
        if (forLabel !== key) {
          this.stepData['checked'][forStep][forQuestion][key]['checkedValue'] = false;
        } else {
          this.stepData['checked'][forStep][forQuestion][key]['checkedValue'] = !this.stepData['checked'][forStep][forQuestion][key]['checkedValue'];
        }
      }

      if (this.stepData['checked'][forStep][forQuestion][forLabel]['checkedValue'] === false) {
        this.stepData['value'][forStep][forQuestion]['value'] = 0;
        this.stepData['value'][forStep][forQuestion]['isChecked'] = false;
      } else {
        this.stepData['value'][forStep][forQuestion]['value'] = Number((document.getElementById(labelId) as HTMLInputElement).value);
        this.stepData['value'][forStep][forQuestion]['isChecked'] = true;
      }

    } catch (error) {
      console.log(error);
    }
  }

  step2(activeId, labelId, forStep, forQuestion, forLabel, isNa, naLabel) {
    try {
      if (isNa) {

        for (let key in this.stepData['checked'][forStep][forQuestion]) {

          if (forLabel !== key) {
            this.stepData['checked'][forStep][forQuestion][key]['checkedValue'] = false;
          } else {
            this.stepData['checked'][forStep][forQuestion][key]['checkedValue'] = !this.stepData['checked'][forStep][forQuestion][key]['checkedValue'];
          }
        }
        if (this.stepData['checked'][forStep][forQuestion][forLabel]['checkedValue'] === false) {
          this.stepData['value'][forStep][forQuestion]['value'] = 0;
          this.stepData['value'][forStep][forQuestion]['isChecked'] = false;
        } else {
          this.stepData['value'][forStep][forQuestion]['value'] = 1;
          this.stepData['value'][forStep][forQuestion]['isChecked'] = true;
        }

        this.previousLabel[forQuestion] = true;

      } else {

        if (this.previousLabel[forQuestion]) {
          if (this.stepData['value'][forStep][forQuestion]['value'] >= 1) {
            this.stepData['value'][forStep][forQuestion]['value'] = this.stepData['value'][forStep][forQuestion]['value'] - 1;
          }
        }

        this.previousLabel[forQuestion] = false;

        this.stepData['checked'][forStep][forQuestion][forLabel]['checkedValue'] = !this.stepData['checked'][forStep][forQuestion][forLabel]['checkedValue'];
        this.stepData['checked'][forStep][forQuestion][naLabel]['checkedValue'] = false;

        if (this.stepData['checked'][forStep][forQuestion][forLabel]['checkedValue'] === false) {
          this.stepData['value'][forStep][forQuestion]['value'] = this.stepData['value'][forStep][forQuestion]['value'] - Number((document.getElementById(labelId) as HTMLInputElement).value);
          let question = JSON.stringify(this.stepData['checked'][forStep][forQuestion]);
          if (question.search('true') === -1) {
            this.stepData['value'][forStep][forQuestion]['isChecked'] = false;
          }
        } else {
          this.stepData['value'][forStep][forQuestion]['value'] = this.stepData['value'][forStep][forQuestion]['value'] + Number((document.getElementById(labelId) as HTMLInputElement).value);
          this.stepData['value'][forStep][forQuestion]['isChecked'] = true;
        }

      }

    } catch (error) {
      console.log(error);
    }
  }

  // FOR GET VALIDATION ERRORS
  get validation() {
    return this.oralModalForm.controls;
  }
}
