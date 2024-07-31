import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { SharedDataService } from './shared/shared-data.service';
import { EventEmitter } from 'stream';
import { style } from '@angular/animations';

@Directive({
  selector: '[appNext]',
})
export class NextDirective {
  slider: any;
  sliderItem: any;
  SliderTotaLength: number = 0;
  sliderLength: number = 0;

  positionX: number = 0;
  // @Output() positionXChange = new EventEmitter<any>()
  constructor(private EementRef: ElementRef, private renderer: Renderer2) {
  }
   ngAfterViewInit() {
    this.readStyles();
  }
  @HostListener('click')
  nextFunc() {
    this.readStyles()
    this.slider = this.EementRef.nativeElement.parentElement.children[2]; //slider
    this.sliderItem =
      this.EementRef.nativeElement.parentElement.children[2].children[0]; //slider item
    this.sliderLength = this.sliderItem.offsetWidth;
    this.getSliderTotaLength();
    

    let newPositionX =
      this.positionX -
      (window.innerWidth - (window.innerWidth - this.sliderLength));
    if (newPositionX < this.SliderTotaLength) {
      this.positionX = this.SliderTotaLength;
      this.renderer.setAttribute(
        this.EementRef.nativeElement,
        'disabled',
        'true'
      );
     
    } else {
      this.positionX = newPositionX;
     
    }

    // this.positionXChange.emit(this.positionX);
    console.log("next button position x " +  this.positionX)
    this.sliderItem.style.transform = `translate3d(${this.positionX}px, 0px, 0px)`;
    this.sliderItem.style.transitionDuration = '300ms';
    
  }

  getSliderTotaLength() {
    let cardNumber = this.slider.getElementsByClassName('card').length;
    let card = this.slider.getElementsByClassName('card')[0];
    let cardWidth = this.slider.getElementsByClassName('card')[0].offsetWidth;
    let cardMarginRight = parseFloat(
      window.getComputedStyle(card).marginRight.replace(/[^0-9\.]/g, '')
    );
    this.SliderTotaLength =
      -(cardMarginRight + cardWidth) * cardNumber + this.sliderLength;
  }

  readStyles() {
    const element =
      this.EementRef.nativeElement.parentElement.children[2].children[0];
    const inlineTransform = element.style.transform;
   this.positionX=+inlineTransform.match(/translate3d\((-?\d+px),\s*(-?\d+px),\s*(-?\d+px)\)/)[1].match(/(-?\d+)px/)[1]

    
  }
  // @HostListener('window:resize', ['$event'])
  // onresize(){this.nextFunc()}
  

}
