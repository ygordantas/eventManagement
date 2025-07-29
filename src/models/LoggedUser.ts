export default interface LoggedUser {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  password?: string;
}
