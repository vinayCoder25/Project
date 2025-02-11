import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobseekerService } from '../jobseeker.service';

@Component({
  selector: 'app-appliedjobs',
  templateUrl: './appliedjobs.component.html',
  styleUrls: ['./appliedjobs.component.css']
})
export class AppliedjobsComponent {
  appliedJobs!: any[];
  
  userId: string = '67a88ffafc1754c8044eeb86'
  constructor(private router: Router, private jobSeekerService: JobseekerService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobSeekerService.getAppliedJobs(this.userId).subscribe((res: any) => {
      if (res) {
        console.log(res)
        this.appliedJobs = res.data
        console.log(this.appliedJobs)
      }
    })
  }

}
