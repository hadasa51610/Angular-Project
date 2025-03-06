import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { LessonService } from '../../services/lesson.service';
import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../models/lesson.model';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [AsyncPipe,MatCardModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  @Input() courseId: number = -1;
  courseDetails$!: Observable<Course>;
  lessons$!: Observable<Lesson[]>;
  constructor(private courseService: CoursesService, private lessonService: LessonService) { }

  ngOnInit() {
    this.courseDetails$ = this.courseService.getCourseById(this.courseId);
    this.lessons$ = this.lessonService.lessons;
    this.lessonService.getAllLessons(this.courseId);
  }
}