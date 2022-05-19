import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '../../common/state';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-fifty-states-list',
  templateUrl: './fifty-states-list.component.html',
  styleUrls: ['./fifty-states-list.component.css']
})
export class FiftyStatesListComponent implements OnInit {

  // initialize array to hold state objects
  // this array is used to display states in the html file
  states!: State[];

  constructor(private stateService: StateService, private route: Router) { }

  ngOnInit(): void {
    this.getStates();
  }

 
  private getStates() {
    // calls stateService to call the http get method to get all state data
    // from the database
    // and subscribe that data into the "state" state object array
    this.stateService.getStateList().subscribe(data => {
      this.states = data;
    })
  }

  // navigates to the detail-state.component.html
  // and passes the id of the clicked state
  // as a parameter
  showDetails(id: number) {
    this.route.navigate(['detail', id]);
  }
   
}
