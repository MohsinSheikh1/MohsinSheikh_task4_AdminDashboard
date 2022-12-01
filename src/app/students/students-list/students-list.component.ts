import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from '../student.model';
import { StudentsService } from '../students.services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnDestroy {
  // Dummy Data For Testing
  // students = [{
  //   _id: '351237',
  //   firstName: 'Mohsin',
  //   lastName: 'Sheikh',
  //   email: 'sheikhmohsin181@gmail.com',
  //   phoneNo: '03115643979',
  //   birthDate: {date: '06', month: '02', year: '2001'},
  //   gender: 'male',
  //   entryYear: '2020',
  //   semester: '5'
  //   },
  //   {
  //   _id: '351237',
  //   firstName: 'Faique',
  //   lastName: 'Sheikh',
  //   email: 'fkhan@gmail.com',
  //   phoneNo: '03115643979',
  //   birthDate: {date: '06', month: '02', year: '2001'},
  //   gender: 'male',
  //   entryYear: '2020',
  //   semester: '5'
  //   },
  //   {
  //   _id: '351237',
  //   firstName: 'Moiz',
  //   lastName: 'Sheikh',
  //   email: 'moiz@gmail.com',
  //   phoneNo: '03115643979',
  //   birthDate: {date: '06', month: '02', year: '2001'},
  //   gender: 'male',
  //   entryYear: '2020',
  //   semester: '5'
  //   }
  // ];

  students: Student[] = [];
  private studentSub: Subscription;
  columnsToDisplay = ['Id', 'firstName', 'lastName', 'email', 'phoneNo', 'birthDate', 'gender', 'entryYear', 'semester', 'delete', 'edit'];

  constructor(public studentsService: StudentsService) {
  }

  ngOnInit(): void {
    this.studentSub = this.studentsService.getStudentsUpdateListener().subscribe({
      next: (updatedStudents) => {this.students = updatedStudents},
      error: (v) => console.log(v),
      complete: () => console.log('complete'),
    });
    this.studentsService.getStudentsData();
  }

  ngOnDestroy(): void {
    this.studentSub.unsubscribe();
  }

  onDelete(id) {
    this.studentsService.deleteStudent(id);
  }
}

