import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { Component, inject, OnInit, signal } from "@angular/core";
import { GetStudent } from "../../models/students.model";
import { StudentsService } from "../../services/students/students.service";

@Component({
  selector: 'app-students',
  standalone: true, // You already had this
  imports: [CommonModule], // ✅ Add CommonModule for *ngFor/*ngIf
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  private readonly studentsService = inject(StudentsService);
  private readonly router = inject(Router);

  students = signal<GetStudent[]>([])

  public async ngOnInit(): Promise<void> {
    const result = await this.studentsService.getStudents;
    this.students.set(result);
  }


  goToCreateStudent() {
  this.router.navigate(['/create-student']);
}

  deleteStudent(index: number) {
    if (confirm(`Are you sure you want to delete ${this.students()[index].first_name}?`)) {
      this.students().splice(index, 1);
    }
  }
}