import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private readonly baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}${endpoint}`);
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, data);
  }

  put(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${endpoint}/${id}`);
  }
}