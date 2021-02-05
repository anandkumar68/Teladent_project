import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("copyright").innerHTML =
    "&copy; 2021 Teladent. All rights reserved. | Designed By <a href='https://webexpo.co.in' target='_blank' alt='webexpo - An Online web design and development agency.'>www.Webexpo.co.in</a> ";

  }

}
