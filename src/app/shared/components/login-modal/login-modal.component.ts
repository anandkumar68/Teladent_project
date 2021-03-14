import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

 
  @Input() link:string;
  @Output() myClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.link);
    this.myClick.emit();
  }

}


