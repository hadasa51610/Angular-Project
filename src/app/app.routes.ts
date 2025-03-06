import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/auth/login/login.component';
import { RegisterComponent } from '../Components/auth/register/register.component';
import { HomeComponent } from '../Components/home/home.component';
import { CoursesComponent } from '../Components/courses/courses.component';
import { CoursesManegmentComponent } from '../Components/courses-manegment/courses-manegment.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: HomeComponent },
    { path: 'course', component: CoursesComponent },
    { path: 'coursesManagement', component: CoursesManegmentComponent }
];
