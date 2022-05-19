import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiftyStatesListComponent } from './fifty-states-list.component';

describe('FiftyStatesListComponent', () => {
  let component: FiftyStatesListComponent;
  let fixture: ComponentFixture<FiftyStatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiftyStatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiftyStatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
