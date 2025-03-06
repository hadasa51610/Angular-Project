import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Lesson } from '../../models/lesson.model';
import { LessonService } from '../../services/lesson.service';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-courses-manegment',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatFormFieldModule, MatListModule, FormsModule, MatToolbarModule, AsyncPipe],
  templateUrl: './courses-manegment.component.html',
  styleUrl: './courses-manegment.component.css'
})
export class CoursesManegmentComponent {

  courses$!: Observable<Course[]>;
  lessons$!: Observable<Lesson[]>;
  courseToSave: Course = { id: 0, title: '', description: '', teacherId: 0 };
  lessonToSave: Lesson = { id: 0, title: '', content: '', courseId: 0 };
  courseId: number = 0;
  option: number = 0;
  constructor(private courseService: CoursesService, private lessonService: LessonService) { }
  ngOnInit() {
    this.courses$ = this.courseService.courses$;
    this.courseService.getCourses();
    this.lessons$ = this.lessonService.lessons;
    this.lessonService.getAllLessons(this.courseId);
  }
  AddCourse() {
    this.courseService.postCourse(this.courseToSave.title, this.courseToSave.description, this.courseToSave.teacherId)
    this.option = 0;
  }
  DeleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId)
  }
  EditCourse() {
    this.courseService.putCourse(this.courseToSave)
    this.option = 0;
  }
  AddLesson() {
    this.lessonService.addLesson(this.lessonToSave);
    this.option = 0;
  }
  DeleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(this.courseId, lessonId);
  }
  EditLesson() {
    this.lessonService.updateLesson(this.courseId, this.lessonToSave.id, this.lessonToSave);
    this.option = 0;
  }
  save(options: number) {
    switch (options) {
      case 1:
        this.EditCourse();
        break;
      case 2:
        this.AddCourse();
        break;
      case 4:
        this.AddLesson();
        break;
      case 5:
        this.EditLesson();
        break;
    }
  }
}