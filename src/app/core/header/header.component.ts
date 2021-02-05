import { Component, OnInit } from '@angular/core';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
declare const $;
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
  otp: string;
  constructor() { }

  ngOnInit(): void {window.onscroll = function() { myFunction() };

  var header = document.getElementById("mainHeader");
  var sticky = header.offsetTop;
  
  function myFunction() {
      if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
      } else {
          header.classList.remove("sticky");
      }
  }



  var tabs = $('.tabs');
  var activeItem = tabs.find('.active');
  var activeWidth = activeItem.innerWidth();
  $(".selector").css({
      "left": activeItem.position.left + "px",
      "width": activeWidth + "px"
  });
  
  $(".tabs").on("click", "a", function(e) {
      e.preventDefault();
      $('.tabs a').removeClass("active");
      $(this).addClass('active');
      var activeWidth = $(this).innerWidth();
      var itemPos = $(this).position();
      $(".selector").css({
          "left": itemPos.left + "px",
          "width": activeWidth + "px"
      });
  });
  




    this.setCountry = CountryISO.India;

  }


  onOtpChange(otp) {
    this.otp = otp;
  }
}
