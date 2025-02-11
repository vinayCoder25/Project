import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '../employer.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent {
  constructor(private route: ActivatedRoute, private employerService: EmployerService) { }
  profileData: any = {};
  isStatusEditMode: boolean = false;
  applicationId!: any;
  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('applicationId');

    this.getDetails(this.applicationId);
  }


  getDetails(applicationId: any) {
    this.employerService.getApplicationDetails(applicationId).subscribe((res) => {
      if (res) {
        console.log(res)
        this.profileData = res;
      }
    })
  }
  toggleEditStatus(): void {
    this.isStatusEditMode = !this.isStatusEditMode;
  }
  contactCandidate() { }

  updateStatus(status: any) {
    console.log(status)
    this.employerService.updateApplicationStatus(this.applicationId, status).subscribe((res) => {
      console.log("updated successfully")
    })
    this.isStatusEditMode = !this.isStatusEditMode;
  }
}
