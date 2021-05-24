import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebApiService } from 'src/app/shared/web-api/web-api.service';
declare const TweenMax;

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  feedbackSmiley = 3;
  feedbackReviewTxt = '';
  feedbackErr = '';
  appointId: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private apiService: WebApiService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.appointId = this.activatedRouter.snapshot.paramMap.get('appointId');

    function $$(selector) {
      var context = context || document;
      var elements = context.querySelectorAll(selector);
      var nodesArr = [].slice.call(elements);
      return nodesArr.length === 1 ? nodesArr[0] : nodesArr;
    };

    var $emotesArr = $$('.fb-emote');
    var numOfEmotes = $emotesArr.length;

    var $dragCont = $$('.fb-cont__drag-cont');
    var $activeEmote = $$('.fb-active-emote');
    var $leftEye = $$('.fb-active-emote__eye--left');
    var $rightEye = $$('.fb-active-emote__eye--right');
    var $smile = $$('.fb-active-emote__smile');

    var emoteColors = {
      terrible: '#f8b696',
      bad: '#f9c686',
      default: '#ffd68c'
    }

    var animTime = 0.5;

    $emotesArr.forEach(function ($emote, i) {
      var progressStep = i / (numOfEmotes - 1);
      $emote.dataset.progress = progressStep;

      $emote.addEventListener('click', function () {
        var progressTo = +this.dataset.progress;
        var type = this.dataset.emote;
        var $target = document.querySelector('#fb-emote-' + type);
        var $lEye = $target.querySelector('.fb-emote__eye--left');
        var $rEye = $target.querySelector('.fb-emote__eye--right');
        var leftEyeTargetD = $lEye.getAttribute('d');
        var rightEyeTargetD = $rEye.getAttribute('d');
        var smileTargetD = $target.querySelector('.fb-emote__smile').getAttribute('d');
        var bgColor = emoteColors[type];
        if (!bgColor) bgColor = emoteColors.default;

        $$('.fb-emote.s--active').classList.remove('s--active');
        this.classList.add('s--active');

        TweenMax.to($activeEmote, animTime, { backgroundColor: bgColor });
        TweenMax.to($dragCont, animTime, { x: progressTo * 100 + '%' });
        TweenMax.to($leftEye, animTime, { morphSVG: $lEye });
        TweenMax.to($rightEye, animTime, { morphSVG: $rEye });
        TweenMax.to($smile, animTime, { attr: { d: smileTargetD } });
      });
    });



  }

  smileyFeedback(value) {
    try {
      this.feedbackSmiley = value;
    } catch (error) {
      console.log(error)
    }
  }

  feedbackReview() {
    this.feedbackReviewTxt = ((document.getElementById('feedReview') as HTMLInputElement).value).trim();
  }

  onSubmit() {
    try {

      if (this.feedbackReviewTxt.length === 0) {
        this.feedbackErr = "Feedback is Mandatory";
        setTimeout(() => {
          this.feedbackErr = '';
        }, 3000);
        return;
      } 

      if (this.feedbackReviewTxt.length < 50) {
        this.feedbackErr = "Minimum 50 Characters";
        setTimeout(() => {
          this.feedbackErr = '';
        }, 3000);
        return;
      }

      let data = {
        appointmentId: this.appointId,
        feedbackSmiley: this.feedbackSmiley,
        feedbackReviewTxt: this.feedbackReviewTxt
      }

      this.apiService.addAppointFeedback(data).subscribe((resolve) => {

        if(resolve.status === 'success') {
          this.toastr.success(resolve.message);
          this.router.navigateByUrl('/web-panel/index')
        }

        if(resolve.status === 'error') {
          this.toastr.error(resolve.message);
        }

      },
      (error) => {
        this.toastr.error(error.message);
        this.router.navigateByUrl('/web-panel/index')
      })

    } catch (error) {
      console.log('Error')
    }
  }


}
