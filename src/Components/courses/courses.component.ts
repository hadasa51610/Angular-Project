import { Component, EventEmitter, Output } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CourseDetailsComponent } from "../course-details/course-details.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, AsyncPipe, CourseDetailsComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses$!: Observable<Course[]>;
  courseId: number = -1;

  constructor(private courseService:CoursesService) { }
  ngOnInit() {
    this.courses$ = this.courseService.courses$;
    this.courseService.getCourses();
  }
  JoinToCourse(courseId: number) {
    this.courseService.postStudentToCourse(courseId, this.courseService.getUserId())
  }
  LeaveCourse(courseId: number) {
    this.courseService.deleteStudentFromCourse(courseId, this.courseService.getUserId())
  }
  showCourseDetails(courseId: number) {
    this.courseId=courseId;
  }
}