import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {
  private cardClickSubject = new BehaviorSubject<any>(null);
  cardClick$ = this.cardClickSubject.asObservable();

  constructor(private _http: HttpClient) { }

  fetchUsers(): Observable<any> {
    const apiUrl='http://localhost:3000/users';
    return this._http.get<any>(apiUrl);
  }

  fetchAssets(): Observable<any> {
    const apiUrl='http://localhost:3000/assets';
    return this._http.get<any>(apiUrl);
  }

  postTransaction(data: any) {
    const apiUrl = 'http://localhost:3000/transactions';
    return this._http.post(apiUrl, data);
  }

  updateTransaction(transactionId: string, updatedData: any) {
    const apiUrl = `http://localhost:3000/transactions/${transactionId}`;
    return this._http.put(apiUrl, updatedData);
  }

  fetchTransactions(): Observable<any> {
    const apiUrl='http://localhost:3000/transactions';
    return this._http.get<any>(apiUrl);
  }
  

  // emitCardClick(dataTrans: any) {
  //   this.cardClickSubject.next(dataTrans);
  //   this.cardClickSubject.complete(); 
  // }

}
