import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { GetStudent, CreateStudentPayload } from '../../models/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/students';

  private studentsSubject = new BehaviorSubject<GetStudent[]>([]);
  public students$ = this.studentsSubject.asObservable();
  getStudents: any;

  // Load students and update BehaviorSubject
  async loadStudents(): Promise<void> {
    try {
      const students = await firstValueFrom(
        this.http.get<GetStudent[]>(this.apiUrl)
      );

      this.studentsSubject.next(students ?? []);
    } catch (error) {
      console.error('Failed to load students:', error);
    }
  }

  // Create student and refresh list
  async createStudent(payload: CreateStudentPayload): Promise<GetStudent> {
    try {
      const result = await firstValueFrom(
        this.http.post<GetStudent>(this.apiUrl, payload)
      );

      await this.loadStudents(); // refresh list
      return result;
    } catch (error) {
      console.error('Create student failed:', error);
      throw error;
    }
  }

  // Delete student and refresh list
  async deleteStudent(id: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.apiUrl}/${id}`)
      );

      await this.loadStudents(); // refresh list
    } catch (error) {
      console.error('Delete student failed:', error);
      throw error;
    }
  }
}
