import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.css']
})
export class CreateJobComponent implements OnInit {
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService, private router: Router) {}

  ngOnInit() {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skills: [''],
      salary: ['', Validators.required]
    });
  }

  submitJob() {
    if (this.jobForm.valid) {
      this.jobService.createJob(this.jobForm.value).subscribe(
        response => {
          alert('Job posted successfully!');
          this.router.navigate(['/employer']); // Redirect to dashboard
        },
        error => {
          console.error('Error posting job', error);
        }
      );
    }
  }
}
