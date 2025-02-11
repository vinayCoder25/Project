import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/employer/jobs'; // Backend API endpoint

  constructor(private http: HttpClient) {}

  createJob(jobDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, jobDetails);
  }
}
