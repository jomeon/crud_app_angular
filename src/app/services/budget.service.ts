import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface Budget {
  id: number;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:3000/budget/1'

  constructor(private http: HttpClient) {}

 
  getBudget(): Observable<Budget> {
    return this.http.get<Budget>(this.apiUrl);
  }

 
  updateBudget(updatedBudget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}/${updatedBudget.id}`, updatedBudget);
  }
  

}


