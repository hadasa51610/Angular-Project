import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/auth/login/login.component';
import { RegisterComponent } from '../Components/auth/register/register.component';
import { HomeComponent } from '../Components/home/home.component';
import { CoursesComponent } from '../Components/courses/courses.component';
import { CoursesManegmentComponent } from '../Components/courses-manegment/courses-manegment.component';
import { authGuard, notAuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent ,canActivate: [notAuthGuard]},
    { path: 'register', component: RegisterComponent ,canActivate: [notAuthGuard]},
    { path: '', component: HomeComponent },
    { path: 'course', component: CoursesComponent ,canActivate: [authGuard]},
    { path: 'coursesManagement', component: CoursesManegmentComponent ,canActivate: [authGuard]}
];
