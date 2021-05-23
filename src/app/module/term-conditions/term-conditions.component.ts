import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.css']
})
export class TermConditionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

}
