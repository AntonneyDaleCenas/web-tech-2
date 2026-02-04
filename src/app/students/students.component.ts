import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngFor and *ngIf

@Component({
  selector: 'app-students',
  standalone: true, // You already had this
  imports: [CommonModule], // ✅ Add CommonModule for *ngFor/*ngIf
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  students = [
    { name: 'Juan Dela Cruz', course: 'BS Information Technology', year: '3rd Year' },
    { name: 'Maria Santos', course: 'BS Computer Science', year: '2nd Year' },
    { name: 'Pedro Reyes', course: 'BS Information Systems', year: '4th Year' }
  ];

  constructor(private router: Router) {}

  goToCreateStudent() {
    this.router.navigate(['/create-student']);
  }

  deleteStudent(index: number) {
    if (confirm(`Are you sure you want to delete ${this.students[index].name}?`)) {
      this.students.splice(index, 1);
    }
  }
}
