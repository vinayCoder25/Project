import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  private getAllJobApi = 'http://localhost:3000/api/employer/alljobs';
  private getAllAppliedjobsApi = 'http://localhost:3000/api/employer/allAppliedJobs';

  private getApplicationDetail = 'http://localhost:3000/api/employer/getApplicationDetails';

  private updateApplicationStatusApi = 'http://localhost:3000/api/employer/updateApplicationStatus';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(this.getAllJobApi);
  }

  getAllAppliedJobs(employerId: any, filters: any): Observable<any> {
    return this.http.post<any>(`${this.getAllAppliedjobsApi}/${employerId}`, filters);
  }

  getApplicationDetails(applicationId: any): Observable<any> {
    return this.http.get<any>(`${this.getApplicationDetail}/${applicationId}`);
  }
  
  updateApplicationStatus(applicationId: any, status: any): Observable<any> {
    return this.http.post<any>(`${this.updateApplicationStatusApi}/${applicationId}`, status);
  }
}
