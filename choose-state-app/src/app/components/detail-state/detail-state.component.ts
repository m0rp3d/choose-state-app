import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { State } from '../../common/state';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-detail-state',
  templateUrl: './detail-state.component.html',
  styleUrls: ['./detail-state.component.css']
})
export class DetailStateComponent implements OnInit {

  // holds the passed in id property from
  // the list-states.component.ts file
  // or fifty-states-list.component.ts file
  id!: number;
  // initialize empty state object
  state: State = new State();

  constructor(private stateService: StateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // passes data from route navigation to "id" variable
    this.id = this.route.snapshot.params['id'];

    // calls service to call http get request method using the "id" variable
    // to subscribe data onto the "state" object
    this.stateService.getStateById(this.id).subscribe(data => {
      this.state = data;
    });
  }

}
