import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {
  private getAllJobApi = 'http://localhost:3000/api/employer/alljobs';
  private submitJobAppApi = 'http://localhost:3000/api/candidate/saveApplication';
  private getAppliedJobsApi = 'http://localhost:3000/api/candidate/getAppliedJobs';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(this.getAllJobApi);
  }

  submitJobApplication(applicationDetails: any): Observable<any> {
    return this.http.post<any>(this.submitJobAppApi, applicationDetails);
  } 

  getAppliedJobs(candidateId: any): Observable<any> {
    return this.http.get<any>(`${this.getAppliedJobsApi}/${candidateId}`);
  }
}
