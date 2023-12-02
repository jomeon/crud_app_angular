import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private _http: HttpClient) { }

  addCampaign(data: any): Observable <any>{
    return this._http.post('http://localhost:3000/campaigns', data);
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
}
