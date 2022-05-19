import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateScore } from '../../common/statescore';
import { StateService } from '../../services/state.service';
import { TransferScoresService } from '../../services/transfer-scores.service';

@Component({
  selector: 'app-list-states',
  templateUrl: './list-states.component.html',
  styleUrls: ['./list-states.component.css']
})
export class ListStatesComponent implements OnInit {
  // initialize new statescore object array
  scoreResults: StateScore[] = [];

  constructor(private transferScores: TransferScoresService, private stateService: StateService, private route: Router) { }

  ngOnInit(): void {
    // gets data passed from priority-form.component.ts file
    // for the statescore object array and fills the "scoreResults"
    // statescore object array with that data
    this.transferScores.stateScores.subscribe((data) => {
      this.scoreResults = data;
    })
  }

  // navigates to the detail-state.component.html
  // and passes the id of the clicked state
  // as a parameter
  showDetails(id: number) {
    this.route.navigate(['detail', id]);
  }
}
