import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ChatComponent } from './chat/chat.component';
// import { SignupComponent } from './auth/signup/signup.component';
import { CreateJobComponent } from './employer/createjob/createjob.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-job', component: CreateJobComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)  },
  { path: 'candidate', loadChildren: () => import('./jobseeker/jobseeker.module').then(m => m.JobseekerModule)},
  { path: 'employer', loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule), canActivate: [AuthGuard]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
