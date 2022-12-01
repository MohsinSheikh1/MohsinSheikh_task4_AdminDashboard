import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Student } from './student.model'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { response } from "express";


@Injectable({providedIn: 'root'})
export class StudentsService {
  private students: Student[] = [    {
    _id: '351237',
    firstName: 'Faique',
    lastName: 'Sheikh',
    email: 'fkhan@gmail.com',
    phoneNo: '03115643979',
    birthDate: {date: '06', month: '02', year: '2001'},
    gender: 'male',
    entryYear: '2020',
    semester: '5'
    }];
  public studentsUpdated = new Subject<Student[]>();

  constructor(private http: HttpClient) {

  }
  // constructor() {

  // }

  getStudentsUpdateListener() {
    return this.studentsUpdated.asObservable();
  }

  getStudentsData () {
    //Dummy Data
    // this.students.push({
    // _id: '351237',
    // firstName: 'Mohsin',
    // lastName: 'Sheikh',
    // email: 'sheikhmohsin181@gmail.com',
    // phoneNo: '03115643979',
    // birthDate: {date: '06', month: '02', year: '2001'},
    // gender: 'male',
    // entryYear: '2020',
    // semester: '5'
    // });

    this.http.get<{message: string, students: any}>('http://127.0.0.1:5000/api/students')
      .subscribe((studentData) => {
        this.students = studentData.students;
        this.studentsUpdated.next([...this.students]);
      });
  }

  addStudent({firstName, lastName, email, phoneNo, gender, birthDate, entryYear, semester}) {
    //creating student object from information got
    const student: Student = {_id: 'null', firstName, lastName, email, phoneNo, gender, birthDate, entryYear, semester};
    this.http.post<{message: string, _id: string}>('http://127.0.0.1:5000/api/students', student).subscribe((responseData) => {
      const id = responseData._id;
      student._id = id;
      this.students.push(student);
      this.studentsUpdated.next([...this.students]);
      console.log(responseData.message);
    });

  }

  deleteStudent(id: string) {
    this.http.delete<{message: string}>('http://127.0.0.1:5000/api/students/' + id)
      .subscribe((responseData) => {
        const updatedStudents = this.students.filter(student => student._id !== id);
        this.students = updatedStudents;
        this.studentsUpdated.next([...this.students]);
      });
  }

  getStudent(id: string) {
    return this.http.get<{message: string, student: any}>('http://127.0.0.1:5000/api/students/' + id);
  }

  updateStudent(id: string, {firstName, lastName, email, phoneNo, gender, birthDate, entryYear, semester}) {
    const student: Student = {_id: id, firstName, lastName, email, phoneNo, gender, birthDate, entryYear, semester};
    this.http.put<{message: string}>('http://127.0.0.1:5000/api/students/' + id, student)
      .subscribe((response) => {console.log(response.message)});
  }
}
