import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private positionXSubject = new BehaviorSubject<number>(0);  // Default value is 0
  // private positionXSubject = new BehaviorSubject<number>(0);
  positionX$ = this.positionXSubject.asObservable();  // Observable to expose the data

  setPositionX(value: number) {
    this.positionXSubject.next(value);  // Update the value
  }

  // updatePosition(index: number, value: number) {
  //   const currentPositions = this.positionXSubject.getValue();
  //   currentPositions[index] = value;
  //   this.positionXSubject.next([...currentPositions]);  // Trigger an update
  // }
}
