import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BudgetService } from './budget.service';
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private _http: HttpClient,private budgetService: BudgetService) { }

  addCampaign(data: any): Observable <any>{
    return this._http.post('http://localhost:3000/campaigns', data).pipe(
      tap((newCampaign: any) => {
        this.budgetService.updateBudgetAfterCampaignAddition(newCampaign.campaignFund).subscribe();
      })
    );
  }
  
  getCampaingList(): Observable <any>{
    return this._http.get('http://localhost:3000/campaigns');
  }
  deleteCampaign(id: number): Observable <any> {
    return this._http.delete(`http://localhost:3000/campaigns/${id}`);
  }
  updateCampaign(id: number, data: any): Observable <any> {
    return this._http.put(`http://localhost:3000/campaigns/${id}`, data);
  
  }
  getCampaignById(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/campaigns/${id}`);
  }
}
