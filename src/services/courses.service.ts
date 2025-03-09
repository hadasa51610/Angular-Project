import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private userId: number = sessionStorage.getItem('userID')! ? parseInt(sessionStorage.getItem('userID')!) : 0;
  private courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public courses$ = this.courses.asObservable();
  
  getUserId(): number {
    return this.userId;
  }

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<Course[]>(`${this.apiUrl}`).subscribe(data => {
      this.courses.next(data);
    });
  }

  getCourseById(id: number) {
    return this.http.get<Course>(`${this.apiUrl}/${id}`)
  }

  postCourse(title: string, description: string, teachrId: number) {
    this.http.post(`${this.apiUrl}`, { title, description, teachrId }).subscribe(() =>
      this.getCourses()
    );
  }

  postStudentToCourse(courseId: number, userId: number){
    this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }).subscribe(() =>
      this.getCourses()
    );
  }

  deleteStudentFromCourse(courseId: number, userId: number) {
    this.http.delete(`${this.apiUrl}/${courseId}/unenroll/${userId}`).subscribe(() =>
      this.getCourses()
    );
  }

  deleteCourse(id: number){
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() =>
      this.getCourses()
    );
  }
  putCourse(course: Course) {
    this.http.put(`${this.apiUrl}/${course.id}`, course).subscribe(() =>
      this.getCourses()
    );
  }
}
