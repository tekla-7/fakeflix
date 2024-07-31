import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { SharedDataService } from './shared/shared-data.service';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {
  positionX: number = 0;
  slider: any;
  sliderItem: any;
  SliderTotaLength:number=0;
  sliderLength:number=0
  constructor(private EementRef: ElementRef ,private renderer: Renderer2) { }
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
    this.getSliderTotaLength()

    let newPositionX =
      this.positionX + (window.innerWidth - (window.innerWidth - this.sliderLength));
    if (newPositionX >0) {
      this.positionX = 0;
      this.renderer.setAttribute(this.EementRef.nativeElement, 'disabled', 'true');

    } else {
      this.positionX = newPositionX;
     

    }
    // this.sharedDataService.setPositionX(this.positionX)
    console.log("next button position x " +  this.positionX)
    this.sliderItem.style.transform = `translate3d(${this.positionX}px, 0px, 0px)`;
    this.sliderItem.style.transitionDuration = '300ms';
  }

  getSliderTotaLength() {
    let cardNumber = this.slider.getElementsByClassName('card').length;
    let card = this.slider.getElementsByClassName('card')[0];
    let cardWidth =
      this.slider.getElementsByClassName('card')[0].offsetWidth;
    let cardMarginRight = parseFloat(
      window.getComputedStyle(card).marginRight.replace(/[^0-9\.]/g, '')
    );
    this.SliderTotaLength = (cardMarginRight + cardWidth) * cardNumber-this.sliderLength;

  }
  readStyles() {
    const element =
      this.EementRef.nativeElement.parentElement.children[2].children[0];
    const inlineTransform = element.style.transform;
   this.positionX=+inlineTransform.match(/translate3d\((-?\d+px),\s*(-?\d+px),\s*(-?\d+px)\)/)[1].match(/(-?\d+)px/)[1]
   console.log("rhisss isss   eeeee" , +this.positionX)
    
  }
  // @HostListener('window:resize', ['$event'])
  // onresize(){this.nextFunc()}

}
