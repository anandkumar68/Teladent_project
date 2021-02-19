import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    document.getElementById("copyright").innerHTML =
    "&copy; 2021 Teladent. All rights reserved. | Designed By <a href='javascript:void(0);'>Tela Dentist Team</a> ";

  }

  // Router Link
  footerRouter(routerLink) {
    this.router.navigateByUrl(routerLink);
  }

}
