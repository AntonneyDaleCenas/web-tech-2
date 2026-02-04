import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  student = {
    name: '',
    course: '',
    year: ''
  };

  constructor(private router: Router) {}

  submitForm() {
    console.log('Student Created:', this.student);
    this.router.navigate(['/students']);
  }
}
