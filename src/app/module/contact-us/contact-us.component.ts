import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    (document.getElementById('home') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('about') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('bytes') as HTMLAnchorElement).classList.remove('active');
    (document.getElementById('contact') as HTMLAnchorElement).classList.add('active');
    (document.getElementById('covid') as HTMLAnchorElement).classList.remove('active');

    (document.getElementById('webmenu') as HTMLAnchorElement).setAttribute('style', "left: 297.922px; width: 111.859px;");

  }

}
