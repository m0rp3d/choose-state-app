import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private baseURL = "http://localhost:8080/api/states";

  constructor(private httpClient: HttpClient) { }

  // method to get all state objects from the database
  getStateList(): Observable<State[]> {
    return this.httpClient.get<State[]>(`${this.baseURL}`);
  }

  // method to get individual state from database
  // using id property of the selected state
  getStateById(id: number): Observable<State> {
    return this.httpClient.get<State>(`${this.baseURL}/${id}`);
  }
}
