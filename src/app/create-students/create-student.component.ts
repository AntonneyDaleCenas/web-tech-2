import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { StudentsService } from "../../services/students/students.service";
import { CreateStudentPayload } from "../../models/students.model";
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class CreateStudentComponent {
  private readonly studentsService = inject(StudentsService);
  private readonly router = inject(Router);

  // FormGroup with validation
  public form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    course: new FormControl('', [Validators.required]),
    year_level: new FormControl('', [Validators.required, Validators.min(1)]),
    gpa: new FormControl('', [Validators.required, Validators.min(0), Validators.max(4)]),
  });

  // Function to create a student
  public async createStudent(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // show validation errors
      return;
    }

    try {
      const payload: CreateStudentPayload = {
        first_name: this.form.value.first_name ?? '',
        last_name: this.form.value.last_name ?? '',
        email: this.form.value.email ?? '',
        age: this.form.value.age ? Number(this.form.value.age) : 0,
        course: this.form.value.course ?? '',
        year_level: this.form.value.year_level ? Number(this.form.value.year_level) : 0,
        gpa: this.form.value.gpa ? Number(this.form.value.gpa) : 0, // Correct GPA handling
        enrollment_status: 'Active',
      };

      await this.studentsService.createStudent(payload);
      alert('Student created successfully!');

      // Reset the form after successful creation
      this.form.reset();

      // Navigate back to students dashboard
      this.router.navigate(['/students']); 
    } catch (error) {
      console.error(error);
      alert('Failed to create student.');
    }
  }

  // Optional helper to check if a form field is invalid
  public isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
