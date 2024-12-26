import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private readonly baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  get(endpoint: string, options?: { params?: any }) {
    let httpParams = new HttpParams();

    if (options?.params) {
      Object.keys(options.params).forEach((key) => {
        if (options.params[key] !== null && options.params[key] !== undefined) {
          httpParams = httpParams.set(key, options.params[key]);
        }
      });
    }

    return this.http.get(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }

  post(endpoint: string, data: any): Observable<any> {
    console.log(`${this.baseUrl}${endpoint}`)
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, data);
  }

  put(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${endpoint}/${id}`);
  }
}