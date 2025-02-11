import { Component } from '@angular/core';
import { EmployerService } from '../employer.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobList!: any[];
  constructor(private employerService: EmployerService
  ) {
  }

  ngOnInit(): void {
    console.log("here jobs")
    this.employerService.getAllJobs().subscribe((res: any) => {
      if (res) {
        console.log("jobs",res)
        this.jobList = res
      }
    })
  }
}
