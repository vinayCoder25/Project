import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../employer.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  employerId = '67a78b58c341aabe814eeb87';
  appliedJobs!: any[];
  data!: any;

  filterForm!: FormGroup;
  // Filters
  experienceFilter: number = 0;
  skillsFilter: string = '';
  locationFilter: string = '';
  constructor(private employerService: EmployerService, private fb: FormBuilder, private router: Router) { }

  get skills() {
    return this.filterForm.get('skills') as FormArray;
  }

  ngOnInit(): void {
  
    // Initialize the form with a FormArray for skills
    this.filterForm = this.fb.group({
      skills: this.fb.array([]),  // skills form array
      experience: [null],         // experience filter
      location: [''],  
      degree: ''           // location filter
    });

    // Add an initial empty skill input
    this.addSkill();
    this.getAppliedCandidateJobDetails();
  }

  addSkill(): void {
    this.skills.push(this.fb.control(null, Validators.required)); // Adding a new skill input with required validation
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);  // Remove skill at the given index
  }
  applyFilters() {
    // console.log(this.filterForm.value)
    // this.employerService.getAllAppliedJobs(this.employerId, this.filterForm.value).subscribe((res) => {
    //   if (res) {
    //     console.log(res);
    //     this.data = res;
    //   }
    // })
    this.getAppliedCandidateJobDetails();
  }

  getAppliedCandidateJobDetails() {
    console.log("filters: ", this.filterForm.value)

    this.employerService.getAllAppliedJobs(this.employerId, this.filterForm.value).subscribe((res) => {
      if(res) {
        console.log(res);
        this.data = res;
      }
    })
  }

  resetFilters() {
    this.filterForm.reset();
    this.getAppliedCandidateJobDetails();
  }



  viewProfile(applicationId: any) {
    this.router.navigate(['/employer/applicant/', applicationId])
  }
}
