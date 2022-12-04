import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../student.model';
import { StudentsService } from '../students.services';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  private mode = 'create';
  private studentID: string;
  student: Student;

  constructor(public studentsServices: StudentsService, public route: ActivatedRoute) { //creating an object of studentsServices class

  }

  ngOnInit(): void {
    //checking if we have id param in the route or not
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('studentID')) {
        this.mode = 'edit';
        this.studentID = paramMap.get('studentID');
        this.studentsServices.getStudent(this.studentID).subscribe(data => {
          this.student = data.student;
        });
      } else {
        this.mode = 'create';
        this.studentID = null;
      }
    });
  }

  onSaveStudent(form: NgForm) {
    if (form.invalid) { //for invalid forms
      return;
    }

    // form.value.birthDate = {year: form.value.birthDate.slice(0, 4), month: form.value.birthDate.slice(5, 7), date: form.value.birthDate.slice(8)};
    if (this.mode === 'create') {
      this.studentsServices.addStudent(form.value);
    } else {
      this.studentsServices.updateStudent(this.studentID, form.value);
    }

    // for valid forms calling student Services method to add the data
    form.resetForm();
  }
}
