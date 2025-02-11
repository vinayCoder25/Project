import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loginResponse: any;
  errorMessage!: any;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value)

      //call api
      this.loginResponse = this.authService.login(this.loginForm.value).subscribe((res) => {
        console.log("response from login api", res);
        if(res.response && res.response.token) {
          console.log("login succssful")
          //save the token in session storage
          this.authService.setToken(res.response.token);
          const role = this.authService.getDataFromToken('role');
          console.log(role)
          if(role) {
            if(role == 'employer') {
              this.router.navigate(['/employer'])
            } else {
              this.router.navigate(['/candidate'])
            }
          }
         
        } else {
          this.errorMessage = res.message;
        }
      })

    }
  }

}
