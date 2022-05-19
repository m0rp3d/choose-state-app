import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from '../../common/state';
import { StateScore } from '../../common/statescore';
import { TransferScoresService } from '../../services/transfer-scores.service';
import { inputOneOrAbove } from '../../shared/priority.validator';

@Component({
  selector: 'app-priority-form',
  templateUrl: './priority-form.component.html',
  styleUrls: ['./priority-form.component.css']
})
export class PriorityFormComponent implements OnInit {

  // boolean used to check if user prefers
  // cold weather over warm weather
  cool!: boolean;

  // variable used to keep track of points user has
  // to allocate for importance of factors
  priorityPoints = 30;
  stateForm = new State();

  // states object array holds ranking for all state factors
  // a value of 1.5 places that factor for that state in the top 8 of 50 states
  // a value of 1.0 places that factor for that state in the top 9-16 of 50 states
  // a value of 0 is a neutral value for the factor that ranks it in the middle 18 states
  // a value of -1.0 places that factor for that state in the bottom 9-16 of 50 states
  // a value of -1.5 places that factor for that state in the bottom 8 for 50 states
  public states = [
    { "number": 1, "name": "Alabama", "employment": 1, "taxes": 1, "growth": -1, "income": -1.5, "home": 1.5, "graduation": -1.5, "college": -1.5, "poverty": -1.5, "homicide": -1.5, "insurance": -1, "climate": 1.5, "rent": 1.5},
    { "number": 2, "name": "Alaska", "employment": -1.5, "taxes": 1.5, "growth": -1.5, "income": 1.5, "home": -1, "graduation": 1.5, "college": 0, "poverty": 1, "homicide": -1.5, "insurance": -1.5, "climate": -1.5, "rent": -1 },
    { "number": 3, "name": "Arizona", "employment": 0, "taxes": 0, "growth": 0, "income": 0, "home": 0, "graduation": -1, "college": 0, "poverty": -1, "homicide": 0, "insurance": -1, "climate": 1, "rent": 0 },
    { "number": 4, "name": "Arkansas", "employment": 1, "taxes": 0, "growth": 0, "income": -1.5, "home": 1.5, "graduation": -1, "college": -1.5, "poverty": -1.5, "homicide": -1.5, "insurance": 0, "climate": 1, "rent": 1.5 },
    { "number": 5, "name": "California", "employment": -1.5, "taxes": -1, "growth": 1.5, "income": 1.5, "home": -1.5, "graduation": -1.5, "college": 1, "poverty": 0, "homicide": 0, "insurance": 0, "climate": 1, "rent": -1.5 },
    { "number": 6, "name": "Colorado", "employment": 0, "taxes": 0, "growth": 1, "income": 1, "home": -1.5, "graduation": 1, "college": 1.5, "poverty": 1, "homicide": 0, "insurance": 0, "climate": -1, "rent": -1.5 },
    { "number": 7, "name": "Connecticut", "employment": -1.5, "taxes": -1.5, "growth": -1, "income": 1.5, "home": -1, "graduation": 0, "college": 1.5, "poverty": 1.5, "homicide": 1, "insurance": 1.5, "climate": 0, "rent": -1 },
    { "number": 8, "name": "Delaware", "employment": -1, "taxes": 1.5, "growth": -1, "income": 1, "home": 0, "graduation": 0, "college": 0, "poverty": 0, "homicide": 0, "insurance": 1, "climate": 1, "rent": -1 },
    { "number": 9, "name": "Florida", "employment": 0, "taxes": 1.5, "growth": 1.5, "income": -1, "home": 0, "graduation": 0, "college": 0, "poverty": 0, "homicide": 0, "insurance": -1.5, "climate": 1.5, "rent": -1 },
    { "number": 10, "name": "Georgia", "employment": 0, "taxes": 1, "growth": 1, "income": 0, "home": 0, "graduation": -1.5, "college": 0, "poverty": -1, "homicide": -1, "insurance": -1.5, "climate": 1.5, "rent": 0 },
    { "number": 11, "name": "Hawaii", "employment": 0, "taxes": -1.5, "growth": 0, "income": 1.5, "home": -1.5, "graduation": 1, "college": 0, "poverty": 1.5, "homicide": 1, "insurance": 1.5, "climate": 1.5, "rent": -1.5 },
    { "number": 12, "name": "Idaho", "employment": 1, "taxes": 1, "growth": 0, "income": 0, "home": 0, "graduation": 0, "college": -1, "poverty": 0, "homicide": 1.5, "insurance": -1, "climate": -1, "rent": 0 },
    { "number": 13, "name": "Illinois", "employment": -1.5, "taxes": -1, "growth": 0, "income": 0, "home": 0, "graduation": 0, "college": 1, "poverty": 0, "homicide": -1, "insurance": 0, "climate": 0, "rent": 0 },
    { "number": 14, "name": "Indiana", "employment": 1.5, "taxes": 0, "growth": 1.5, "income": -1, "home": 1.5, "graduation": 0, "college": -1, "poverty": 0, "homicide": -1, "insurance": 0, "climate": 0, "rent": 1 },
    { "number": 15, "name": "Iowa", "employment": 0, "taxes": -1, "growth": 1, "income": 0, "home": 1, "graduation": 1, "college": 0, "poverty": 0, "homicide": 0, "insurance": 1.5, "climate": -1, "rent": 1.5 },
    { "number": 16, "name": "Kansas", "employment": 1.5, "taxes": -1, "growth": -1, "income": 0, "home": 1, "graduation": 1, "college": 0, "poverty": 0, "homicide": 0, "insurance": 0, "climate": 0, "rent": 0 },
    { "number": 17, "name": "Kentucky", "employment": 0, "taxes": 0, "growth": 0, "income": -1.5, "home": 1.5, "graduation": -1.5, "college": -1.5, "poverty": -1.5, "homicide": 0, "insurance": 1, "climate": 1, "rent": 1.5 },
    { "number": 18, "name": "Louisiana", "employment": -1, "taxes": 0, "growth": -1.5, "income": -1.5, "home": 1, "graduation": -1.5, "college": -1.5, "poverty": -1.5, "homicide": -1.5, "insurance": 0, "climate": 1.5, "rent": 0 },
    { "number": 19, "name": "Maine", "employment": 0, "taxes": -1.5, "growth": 0, "income": 0, "home": 0, "graduation": 1.5, "college": 0, "poverty": 0, "homicide": 1.5, "insurance": 0, "climate": -1.5, "rent": 0 },
    { "number": 20, "name": "Maryland", "employment": -1.5, "taxes": -1, "growth": -1.5, "income": 1.5, "home": -1.5, "graduation": 0, "college": 1.5, "poverty": 1.5, "homicide": -1.5, "insurance": 1, "climate": 0, "rent": -1.5 },
    { "number": 21, "name": "Massachusetts", "employment": -1, "taxes": 0, "growth": 1, "income": 1.5, "home": -1.5, "graduation": 0, "college": 1.5, "poverty": 1.5, "homicide": 1, "insurance": 1.5, "climate": -1, "rent": -1.5 },
    { "number": 22, "name": "Michigan", "employment": -1, "taxes": 0, "growth": 1, "income": 0, "home": 1, "graduation": 0, "college": 0, "poverty": -1, "homicide": 0, "insurance": 1.5, "climate": -1, "rent": 0 },
    { "number": 23, "name": "Minnesota", "employment": 1.5, "taxes": -1.5, "growth": 0, "income": 1, "home": 0, "graduation": 1.5, "college": 1, "poverty": 1.5, "homicide": 1.5, "insurance": 1.5, "climate": -1.5, "rent": 0 },
    { "number": 24, "name": "Mississippi", "employment": -1, "taxes": -1, "growth": 0, "income": -1.5, "home": 1.5, "graduation": -1.5, "college": -1.5, "poverty": -1.5, "homicide": -1.5, "insurance": -1.5, "climate": 1.5, "rent": 1.5 },
    { "number": 25, "name": "Missouri", "employment": 0, "taxes": 1, "growth": 0, "income": -1, "home": 1, "graduation": 0, "college": 0, "poverty": 0, "homicide": -1.5, "insurance": 0, "climate": 0, "rent": 1 },
    { "number": 26, "name": "Montana", "employment": 1.5, "taxes": 1.5, "growth": 1.5, "income": -1, "home": 0, "graduation": 1.5, "college": 0, "poverty": 0, "homicide": 0, "insurance": 0, "climate": -1.5, "rent": 1 },
    { "number": 27, "name": "Nebraska", "employment": 1.5, "taxes": 0, "growth": 0, "income": 0, "home": 1, "graduation": 0, "college": 0, "poverty": 1, "homicide": 1.5, "insurance": 0, "climate": 0, "rent": 1 },
    { "number": 28, "name": "Nevada", "employment": -1.5, "taxes": 0, "growth": 1.5, "income": 0, "home": -1, "graduation": -1, "college": -1.5, "poverty": 0, "homicide": -1.5, "insurance": -1.5, "climate": 0, "rent": -1 },
    { "number": 29, "name": "New Hampshire", "employment": 1.5, "taxes": 1.5, "growth": 1.5, "income": 1.5, "home": -1, "graduation": 1.5, "college": 1.5, "poverty": 1.5, "homicide": 1.5, "insurance": 1, "climate": -1, "rent": -1},
    { "number": 30, "name": "New Jersey", "employment": -1, "taxes": -1.5, "growth": 0, "income": 1.5, "home": -1.5, "graduation": 0, "college": 1.5, "poverty": 1.5, "homicide": 0, "insurance": 0, "climate": 0, "rent": -1.5},
    { "number": 31, "name": "New Mexico", "employment": -1.5, "taxes": -1, "growth": -1.5, "income": -1.5, "home": 0, "graduation": -1.5, "college": -1, "poverty": -1.5, "homicide": -1, "insurance": -1, "climate": 0, "rent": 1},
    { "number": 32, "name": "New York", "employment": -1, "taxes": -1.5, "growth": 0, "income": 1, "home": -1.5, "graduation": -1, "college": 1, "poverty": 0, "homicide": 1, "insurance": 1, "climate": -1, "rent": -1.5},
    { "number": 33, "name": "North Carolina", "employment": 0, "taxes": 1, "growth": 1.5, "income": -1, "home": 0, "graduation": 0, "college": 0, "poverty": -1, "homicide": 0, "insurance": -1, "climate": 1, "rent": 0},
    { "number": 34, "name": "North Dakota", "employment": 1, "taxes": 1, "growth": -1.5, "income": 0, "home": 0, "graduation": 1.5, "college": 0, "poverty": 1, "homicide": 1.5, "insurance": 0, "climate": -1.5, "rent": 1},
    { "number": 35, "name": "Ohio", "employment": 0, "taxes": 0, "growth": -1, "income": -1, "home": 1.5, "graduation": 0, "college": -1, "poverty": -1, "homicide": -1, "insurance": 0, "climate": 0, "rent": 1},
    { "number": 36, "name": "Oklahoma", "employment": 1, "taxes": 1, "growth": -1.5, "income": -1.5, "home": 1.5, "graduation": -1, "college": -1.5, "poverty": -1.5, "homicide": -1, "insurance": -1.5, "climate": 1, "rent": 1.5},
    { "number": 37, "name": "Oregon", "employment": 0, "taxes": 0, "growth": 0, "income": 0, "home": -1, "graduation": 0, "college": 1, "poverty": 0, "homicide": 1, "insurance": 0, "climate": 0, "rent": -1},
    { "number": 38, "name": "Pennsylvania", "employment": -1.5, "taxes": 0, "growth": 0, "income": 0, "home": 0, "graduation": 0, "college": 0, "poverty": 0, "homicide": 0, "insurance": 1, "climate": 0, "rent": 0},
    { "number": 39, "name": "Rhode Island", "employment": 0, "taxes": -1.5, "growth": 0, "income": 1, "home": -1, "graduation": 0, "college": 1, "poverty": 0, "homicide": 1.5, "insurance": 1.5, "climate": 0, "rent": 0},
    { "number": 40, "name": "South Carolina", "employment": 0, "taxes": 1, "growth": 1, "income": -1, "home": 1, "graduation": -1, "college": -1, "poverty": -1, "homicide": -1, "insurance": -1, "climate": 1.5, "rent": 0},
    { "number": 41, "name": "South Dakota", "employment": 1.5, "taxes": 1.5, "growth": 0, "income": 0, "home": 1, "graduation": 1, "college": -1, "poverty": 0, "homicide": 1, "insurance": -1, "climate": -1, "rent": 1.5},
    { "number": 42, "name": "Tennessee", "employment": 0, "taxes": 1.5, "growth": 1.5, "income": -1, "home": 0, "graduation": -1, "college": -1, "poverty": -1, "homicide": -1, "insurance": -1, "climate": 1, "rent": 0},
    { "number": 43, "name": "Texas", "employment": -1, "taxes": 0, "growth": 0, "income": 0, "home": 0, "graduation": -1.5, "college": 0, "poverty": -1, "homicide": 0, "insurance": -1.5, "climate": 1.5, "rent": 0},
    { "number": 44, "name": "Utah", "employment": 1.5, "taxes": -1, "growth": 1, "income": 1, "home": -1, "graduation": 1, "college": 1, "poverty": 1.5, "homicide": 1, "insurance": 0, "climate": 0, "rent": 0},
    { "number": 45, "name": "Vermont", "employment": 1, "taxes": -1.5, "growth": -1.5, "income": 0, "home": 0, "graduation": 1.5, "college": 1.5, "poverty": 1, "homicide": 1.5, "insurance": 1.5, "climate": -1.5, "rent": 0},
    { "number": 46, "name": "Virginia", "employment": 1, "taxes": 0, "growth": -1, "income": 1, "home": -1, "graduation": 0, "college": 1.5, "poverty": 1, "homicide": 0, "insurance": 0, "climate": 0, "rent": -1},
    { "number": 47, "name": "Washington", "employment": 0, "taxes": 0, "growth": 1, "income": 1, "home": -1.5, "graduation": 1, "college": 1, "poverty": 1, "homicide": 0, "insurance": 1, "climate": 0, "rent": -1.5},
    { "number": 48, "name": "West Virginia", "employment": 0, "taxes": 0, "growth": -1, "income": -1.5, "home": 1.5, "graduation": -1, "college": -1.5, "poverty": -1.5, "homicide": 0, "insurance": 0, "climate": 0, "rent": 1.5},
    { "number": 49, "name": "Wisconsin", "employment": 1, "taxes": 0, "growth": -1, "income": 0, "home": 0, "graduation": 1, "college": 0, "poverty": 0, "homicide": 0, "insurance": 1, "climate": -1.5, "rent": 0},
    { "number": 50, "name": "Wyoming", "employment": 0, "taxes": 1.5, "growth": -1.5, "income": 0, "home": 0, "graduation": 1.5, "college": -1, "poverty": 1, "homicide": 1, "insurance": -1.5, "climate": -1.5, "rent": 1}
    // these scores were assigned by me, using sorting method and assigning score based on where the factor ranked among other 49 states
    // see readme file for sources for all factors
  ];

  // initiate empty array for statescore objects
  // array used to store 50 statescore objects
  // statescore objects are used to tally a score for each state
  // score is tallied based on input for each state factor entered by user
  scoreArr: StateScore[] = [];

  constructor(private fb: FormBuilder, private transferScores: TransferScoresService, private router: Router ) { }

  // validators for input form which check that input is placed
  // and that the input is 1 or above
  statePriorityForm = this.fb.group({
    employment: ['', [Validators.required, inputOneOrAbove]],
    taxes: ['', [Validators.required, inputOneOrAbove]],
    growth: ['', [Validators.required, inputOneOrAbove]],
    income: ['', [Validators.required, inputOneOrAbove]],
    home: ['', [Validators.required, inputOneOrAbove]],
    graduation: ['', [Validators.required, inputOneOrAbove]],
    college: ['', [Validators.required, inputOneOrAbove]],
    poverty: ['', [Validators.required, inputOneOrAbove]],
    homicide: ['', [Validators.required, inputOneOrAbove]],
    insurance: ['', [Validators.required, inputOneOrAbove]],
    climate: ['', [Validators.required, inputOneOrAbove]],
    rent: ['', [Validators.required, inputOneOrAbove]]
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.createRankings();
    this.passStateScores();
    // navigates to the list component on submit
    this.router.navigate(['list']);
  }

  // method used to assign score for each state,
  // based on where each individual factor ranks
  // and user input which multiplies score
  createRankings() {
    // for loop, loops for each state(total of 50 times)
    for (let i: number = 0; i < this.states.length; i++) {

      let weather = 1;

      //create a statescore object for the state
      // in i index
      let temp = new StateScore();

      // store name of that state in statescore object
      temp.name = this.states[i].name;
      // store number of that state in statescore object
      temp.number = this.states[i].number;

      // if user selects the checkbox for "Prefer cooler climate"
      // states ranked higher in warm will detract instead of adding
      // to total score
      if (this.cool === true) {
        weather = -1;
        console.log("cool is " + this.cool);
      }
      // assigns score for each factor multiplied by user input
      // higher input will place a higher score for that factor
      temp.score = (this.stateForm.employment * this.states[i].employment) +
        (this.stateForm.taxes * this.states[i].taxes) +
        (this.stateForm.growth * this.states[i].growth) +
        (this.stateForm.income * this.states[i].income) +
        (this.stateForm.home * this.states[i].home) +
        (this.stateForm.graduation * this.states[i].graduation) +
        (this.stateForm.college * this.states[i].college) +
        (this.stateForm.poverty * this.states[i].poverty) +
        (this.stateForm.homicide * this.states[i].homicide) +
        (this.stateForm.insurance * this.states[i].insurance) +
        (this.stateForm.climate * (this.states[i].climate * weather)) +
        (this.stateForm.rent * this.states[i].rent);

      // pushes statescore object named "temp" into array of statescore objects
      // called scoreArr
      this.scoreArr.push(temp);
    }

    // after scores have been calculated for all 50 states
    // sorts those statescore objects from top to bottom
    // based on highest score
    this.scoreArr.sort((a, b) => (a.score < b.score) ? 1 : -1);
  }

  // calls service to pass statescore array "scoreArr" to another component
  passStateScores() {
    this.transferScores.stateScores.next(this.scoreArr);
  }

  // method that keeps track of points available to allocate
  // used in input form
  subtract(theStateForm: State) {
    this.priorityPoints = 30;
    this.priorityPoints = this.priorityPoints -
      theStateForm.employment -
      theStateForm.taxes -
      theStateForm.growth -
      theStateForm.income -
      theStateForm.home -
      theStateForm.graduation -
      theStateForm.college -
      theStateForm.poverty -
      theStateForm.homicide -
      theStateForm.insurance -
      theStateForm.climate -
      theStateForm.rent;
  }

  // method that checks checkbox for preference
  // of cold weather over warm weather
  changeWarmerToCooler(value: boolean) {
    this.cool = value;
  }

}




/*
{ "Alaska", - 1.5, 1.5, - 1.5, 1.5, - 1, 1.5, 0, 1, - 1.5, - 1.5, - 1.5, - 1 },
{ Arizona	0	0	0	0	0 - 1	0 - 1	0 - 1			1	0 }
Arkansas	1	0	0 - 1.5	1.5 - 1 - 1.5 - 1.5 - 1.5	0			1	1.5
California - 1.5 - 1	1.5	1.5 - 1.5 - 1.5	1	0	0	0			1 - 1.5
Colorado	0	0	1	1 - 1.5	1	1.5	1	0	0 - 1 - 1.5
Connecticut - 1.5 - 1.5 - 1	1.5 - 1	0	1.5	1.5	1	1.5			0 - 1
Delaware - 1	1.5 - 1	1	0	0	0	0	0	1			1 - 1
Florida	0	1.5	1.5 - 1	0	0	0	0	0 - 1.5			1.5 - 1
Georgia	0	1	1	0	0 - 1.5	0 - 1 - 1 - 1.5			1.5	0
Hawaii	0 - 1.5	0	1.5 - 1.5	1	0	1.5	1	1.5			1.5 - 1.5
Idaho	1	1	0	0	0	0 - 1	0	1.5 - 1 - 1	0
Illinois - 1.5 - 1	0	0	0	0	1	0 - 1	0			0	0
Indiana	1.5	0	1.5 - 1	1.5	0 - 1	0 - 1	0			0	1
Iowa	0 - 1	1	0	1	1	0	0	0	1.5 - 1	1.5
Kansas	1.5 - 1 - 1	0	1	1	0	0	0	0			0	0
Kentucky	0	0	0 - 1.5	1.5 - 1.5 - 1.5 - 1.5	0	1			1	1.5
Louisiana - 1	0 - 1.5 - 1.5	1 - 1.5 - 1.5 - 1.5 - 1.5	0			1.5	0
Maine	0 - 1.5	0	0	0	1.5	0	0	1.5	0 - 1.5	0
Maryland - 1.5 - 1 - 1.5	1.5 - 1.5	0	1.5	1.5 - 1.5	1			0 - 1.5
Massachusetts - 1	0	1	1.5 - 1.5	0	1.5	1.5	1	1.5 - 1 - 1.5
Michigan - 1	0	1	0	1	0	0 - 1	0	1.5 - 1	0
Minnesota	1.5 - 1.5	0	1	0	1.5	1	1.5	1.5	1.5 - 1.5	0
Mississippi - 1 - 1	0 - 1.5	1.5 - 1.5 - 1.5 - 1.5 - 1.5 - 1.5			1.5	1.5
Missouri	0	1	0 - 1	1	0	0	0 - 1.5	0			0	1
Montana	1.5	1.5	1.5 - 1	0	1.5	0	0	0	0 - 1.5	1
Nebraska	1.5	0	0	0	1	0	0	1	1.5	0			0	1
Nevada - 1.5	0	1.5	0 - 1 - 1 - 1.5	0 - 1.5 - 1.5			0 - 1
New Hampshire	1.5	1.5	1.5	1.5 - 1	1.5	1.5	1.5	1.5	1 - 1 - 1
New Jersey - 1 - 1.5	0	1.5 - 1.5	0	1.5	1.5	0	0			0 - 1.5
New Mexico - 1.5 - 1 - 1.5 - 1.5	0 - 1.5 - 1 - 1.5 - 1 - 1			0	1
New York - 1 - 1.5	0	1 - 1.5 - 1	1	0	1	1 - 1 - 1.5
North Carolina	0	1	1.5 - 1	0	0	0 - 1	0 - 1			1	0
North Dakota	1	1 - 1.5	0	0	1.5	0	1	1.5	0 - 1.5	1
Ohio	0	0 - 1 - 1	1.5	0 - 1 - 1 - 1	0			0	1
Oklahoma	1	1 - 1.5 - 1.5	1.5 - 1 - 1.5 - 1.5 - 1 - 1.5			1	1.5
Oregon	0	0	0	0 - 1	0	1	0	1	0			0 - 1
Pennsylvania - 1.5	0	0	0	0	0	0	0	0	1			0	0
Rhode Island	0 - 1.5	0	1 - 1	0	1	0	1.5	1.5			0	0
South Carolina	0	1	1 - 1	1 - 1 - 1 - 1 - 1 - 1			1.5	0
South Dakota	1.5	1.5	0	0	1	1 - 1	0	1 - 1 - 1	1.5
Tennessee	0	1.5	1.5 - 1	0 - 1 - 1 - 1 - 1 - 1			1	0
Texas - 1	0	0	0	0 - 1.5	0 - 1	0 - 1.5			1.5	0
Utah	1.5 - 1	1	1 - 1	1	1	1.5	1	0			0	0
Vermont	1 - 1.5 - 1.5	0	0	1.5	1.5	1	1.5	1.5 - 1.5	0
Virginia	1	0 - 1	1 - 1	0	1.5	1	0	0			0 - 1
Washington	0	0	1	1 - 1.5	1	1	1	0	1			0 - 1.5
West Virginia	0	0 - 1 - 1.5	1.5 - 1 - 1.5 - 1.5	0	0			0	1.5
Wisconsin	1	0 - 1	0	0	1	0	0	0	1 - 1.5	0
Wyoming	0	1.5 - 1.5	0	0	1.5 - 1	1	1 - 1.5 - 1.5	1
*/


