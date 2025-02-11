import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Frontend';
  isLoggedIn: boolean = false;
  isEmployer: boolean = false;

  private authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    // On page load, check if the user is already logged in based on sessionStorage
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const role = this.authService.getDataFromToken('role');
      this.isEmployer = role === 'employer';
    }

    // Subscribe to login status changes
    this.authSubscription = this.authService.isLoggedInn$.subscribe((status) => {
      this.isLoggedIn = status;

      if (this.isLoggedIn) {
        const role = this.authService.getDataFromToken('role');
        this.isEmployer = role === 'employer';
      } else {
        this.isEmployer = false; // Reset if not logged in
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription to avoid memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  logOUt() {
    this.authService.logOutSession();
    this.router.navigate(['/auth/login']);
    // No need for cdRef.detectChanges() here; it's usually only needed in specific cases like OnPush strategy
  }
}
