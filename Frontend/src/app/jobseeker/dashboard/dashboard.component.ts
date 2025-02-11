import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobseekerService } from '../jobseeker.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recommendedJobs: any[] = []; // Initialize to prevent errors
  jobList: any[] = []; // Initialize to prevent errors
  profileCreated: boolean = true;
  userId: string = '';

  constructor(private router: Router, private jobSeekerService: JobseekerService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    this.userId = this.authService.getDataFromToken('userId')||''; // Ensure correct field is fetched
    console.log('User ID:', this.userId); // Debugging
    if (this.userId) {
      this.getAllJobs();
    }
  }

  getAllJobs() {
    this.jobSeekerService.getAllJobs().subscribe((res: any) => {
      if (res && Array.isArray(res)) {
        console.log(res);
  
        // Format data to ensure it's correctly structured
        this.jobList = res.map((job: any) => ({
          title: job.title || 'N/A',                // Default 'N/A' if missing
          description: job.description || 'N/A',
          salary: job.salary ? `₹${job.salary}` : 'N/A', // Adding currency symbol
          skills: job.skills ? job.skills.split(',').map((s: string) => s.trim()) : ['N/A'] // Ensure skills is an array
        }));
      } else {
        this.jobList = []; // Handle empty or incorrect response
      }
    });
  }
  
  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  completeProfile(): void {
    this.router.navigate(['/candidate/profile']);
  }

  applyForJob(jobId: any) {
    if (!this.userId) {
      console.error('User ID not found');
      return;
    }

    const jobApplication = {
      jobId: jobId,
      candidateId: this.userId
    };

    this.jobSeekerService.submitJobApplication(jobApplication).subscribe((res) => {
      if (res.success) {
        console.log('Application Successful:', res);
      } else {
        console.error('Application Failed:', res);
      }
    });
  }
}
