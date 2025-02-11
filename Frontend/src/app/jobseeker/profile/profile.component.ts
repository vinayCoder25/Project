import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  candidateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form with one skill input
    this.candidateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.array([this.fb.control('', Validators.required)]), // FormArray for skills
      preferences: this.fb.group({
        location: this.fb.array([this.fb.control('')]),
        role: ['']
      }),
      resume: [null, Validators.required] // Add resume field as FormControl
    });
  }

  // Get the skills FormArray
  get skills(): FormArray {
    return this.candidateForm.get('skills') as FormArray;
  }
  selectedFile: File | null = null;
  fileSelected = false;
  errorMessage: string | null = null;

  // Add a new skill input field
  addSkill(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Update the form with the selected file
      this.candidateForm.patchValue({
        resume: file
      });
    } else {
      alert('Please upload a valid PDF file');
      this.candidateForm.patchValue({
        resume: null
      });
    }
  }

  // Remove a skill input field by index, but prevent removal of the first skill
  removeSkill(index: number): void {
    if (index > 0) {
      this.skills.removeAt(index);
    }
  }

  // Submit the form
  onSubmit(): void {

  console.log(this.candidateForm.value)
    if (this.candidateForm.valid) {
      console.log(this.candidateForm.value);
    }
  }
}
