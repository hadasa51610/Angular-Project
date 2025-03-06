import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://localhost:3000/api/courses';
  private lessons$: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  public lessons: Observable<Lesson[]> = this.lessons$.asObservable();

  constructor(private http: HttpClient) { }

  getAllLessons(courseId: number){
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`).subscribe(data => {
      this.lessons$.next(data);
    });
  }

  getLessonById(courseId: number, lessonId: number){
    return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }

  addLesson(lesson: any){
    this.http.post(`${this.apiUrl}/${lesson.courseId}/lessons`, lesson).subscribe(() =>
      this.getAllLessons(lesson.courseId)
    );
  }

  updateLesson(courseId: number, lessonId: number, lesson: any){
    this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson).subscribe(() =>
      this.getAllLessons(courseId)
    );
  }

  deleteLesson(courseId: number, lessonId: number){
    this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`).subscribe(() =>
      this.getAllLessons(courseId)
    );
  }
}
