export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  birthDate: {date: string, month: string, year: string};
  gender: string;
  entryYear: string;
  semester:string;
}
