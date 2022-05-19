import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferScoresService {

  stateScores: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() { }

  // method stores statescore object
  storeScoredStates(passedScores: any) {
    this.stateScores.next(passedScores);

  }

  // method retrieves stored statescore object
  // used to retrieve statescore object in another component
  retrievePassedObject() {
    return this.stateScores;

  }
}

