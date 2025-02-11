import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppliedjobsComponent } from './appliedjobs/appliedjobs.component';

const jobseekerRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'appliedjobs', component: AppliedjobsComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    AppliedjobsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(jobseekerRoutes)
  ]
})
export class JobseekerModule { }
