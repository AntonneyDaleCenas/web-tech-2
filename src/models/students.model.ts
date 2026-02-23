// Export interface for retrieving student data
export interface GetStudent {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  course: string;
  year_level: number;
  gpa: number;
  enrollment_status: number;
  created_at: string;
}

// Export interface for creating a new student
export interface CreateStudentPayload {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  course: string;
  year_level: number;
  gpa: number;
  enrollment_status: string;
}
