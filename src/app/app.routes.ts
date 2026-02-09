import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { CreateStudentComponent } from './create-students/create-student.component';
import { PrelimExamComponent } from './prelim-exam/prelim-exam.component';

export const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'create-student', component: CreateStudentComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'prelim-exam', component: PrelimExamComponent }
];
