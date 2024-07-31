import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MoviesDescription } from '../../../core/interfaces/movies-description';
import { MoviesListService } from '../../../core/service/movies-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrl: './slider-list.component.scss',
})
export class SliderListComponent {
  movieList: MoviesDescription[] = [];
  windowWidth: number;
  positionX: number = 0;
  dotList:number[]=[];
  currentActiveDot=0;
  cardWidth:number=0
dot:number=1;
maxWidth:number=0;
currentX:any=200;
 
  constructor(
    private movieslistService: MoviesListService,
    private http: HttpClient
  ) {
    this.windowWidth = window.innerWidth;
    this.movieslistService
      .getMovies()
      .subscribe(
        (data) => {this.movieList = data
          this.cardWidth=window.innerWidth*0.2226>317.16?317.16 :window.innerWidth*0.2226;
          this.dot =Math.round(this.cardWidth*this.movieList.length/(window.innerWidth-window.innerWidth*8 /100))
          this.dotList= new Array(this.dot).fill(0);
          console.log("this  "+Math.round(this.cardWidth*this.movieList.length/(window.innerWidth)))

        }
      );

  }
//   slideLeft() {
//     let newPositionX=this.positionX+(window.innerWidth-window.innerWidth*8 /100);

//     if(newPositionX>0){
//       this.positionX=0;
//     }else if(newPositionX<0){
//       this.positionX= newPositionX
//     }
//     this.currentActiveDot--;

//   }
//   slideRight() {
   
// ////////////////////      

//     let maxPositionX=-this.movieList.length*(this.cardWidth+8)+(window.innerWidth-window.innerWidth*8 /100);
//     let newPositionX=this.positionX-(window.innerWidth-window.innerWidth*8 /100);
// if(maxPositionX>newPositionX){
//   this.positionX=maxPositionX;
// }else if(maxPositionX<newPositionX){
//   this.positionX= newPositionX
// }


// this.currentActiveDot++;
  
// }

  @HostListener('window:resize', ['$event'])
  // onResize(event: Event): void {
  //  this.cardWidth=window.innerWidth*0.2226>317.16?317.16 :window.innerWidth*0.2226;
  //  this.dot =Math.round(this.cardWidth*this.movieList.length/(window.innerWidth-window.innerWidth*8 /100));
  //  console.log("this iss "+Math.round(this.cardWidth*this.movieList.length/(window.innerWidth)))
  //  this.dotList= new Array(this.dot).fill(0);
  //  this.windowWidth = window.innerWidth;
  //   // this.slideRight();
  //   // this.slideLeft()
  //   // console.log("elemnt withd"+this.card?.nativeElement.offsetWidth)
  // }

  ngOnInit(): void {
    // console.log("thissss"+this.movieList)
  }
}
