import { Component, OnInit } from '@angular/core';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  setCountry: any;
  constructor() { }

  ngOnInit(): void {
    this.setCountry = CountryISO.India;
  }

}
