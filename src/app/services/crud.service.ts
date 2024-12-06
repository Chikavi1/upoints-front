import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}

  getAll(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }

  getById(url: string, id: number): Observable<any> {
    return this.http.get<any>(`${url}/${id}`);
  }

  create(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }

  update(url: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${url}/${id}`, data);
  }

  delete(url: string, id: number): Observable<any> {
    return this.http.delete<any>(`${url}/${id}`);
  }
}
