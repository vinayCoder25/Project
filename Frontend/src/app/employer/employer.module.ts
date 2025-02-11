import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CreateJobComponent } from './createjob/createjob.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';

const employerRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'applicants', component: CandidatesComponent },
  { path: 'applicant/:applicationId', component: CandidateProfileComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    JobsComponent,
    SidenavComponent,
    CreateJobComponent,
    CandidatesComponent,
    CandidateProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(employerRoutes)
  ]
})
export class EmployerModule { }
