import { Component } from '@angular/core';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarActive = false;
  interactiveNotificationVisible: boolean = true;
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  candidatesVisible = false;

  candidates = [
    { name: 'John Doe', skills: 'JavaScript, Angular', jobTitle: 'Frontend Developer' },
    { name: 'Jane Smith', skills: 'Java, Spring', jobTitle: 'Backend Developer' },
    { name: 'Alice Johnson', skills: 'Python, Django', jobTitle: 'Data Scientist' }
  ];
  showCandidates: boolean = false;
  viewCandidates() {
    // Toggle the visibility of the candidates dropdown
    this.candidatesVisible = !this.candidatesVisible;
  }
  viewCandidateDetails(candidate: any) {}

  closeCandidates() {
    this.showCandidates = false;
  }

  // Show the interactive notification
  showInteractiveNotification() {
    this.interactiveNotificationVisible = true;
  }

  // Action to view candidates (could navigate to another page)
  // viewCandidates() {
  //   // Logic to navigate or show candidates
  //   console.log('Navigating to candidates...');
  //   this.closeInteractiveNotification();
  // }
  stayOpen(event: MouseEvent): void {
    event.stopPropagation();  // Prevents the dropdown from closing
  }

  // Close the notification manually
  closeInteractiveNotification() {
    this.interactiveNotificationVisible = false;
  }


  toggleCandidatesList(): void {
    this.candidatesVisible = !this.candidatesVisible;
  }
}
