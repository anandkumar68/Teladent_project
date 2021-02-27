import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
    var pageX = $(document).width();
    var pageY = $(document).height();
    var mouseY = 0;
    var mouseX = 0;

    $(document).mousemove(function (event) {
      //verticalAxis
      mouseY = event.pageY;
      const yAxis = (pageY / 2 - mouseY) / pageY * 300;
      //horizontalAxis
      mouseX = event.pageX / -pageX;
      const xAxis = -mouseX * 100 - 100;

      $('.box__ghost-eyes').css({ 'transform': 'translate(' + xAxis + '%,-' + yAxis + '%)' });

      //console.log('X: ' + xAxis);

    });
  }

  goBack(){
    this.location.back();
  }

}
