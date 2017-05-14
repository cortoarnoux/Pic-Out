
export class User {
  email: string;
  username: string;
  lastname: string;
  firstname: string;
  rangemin: number;
  rangemax: number;
  params: object;

  constructor(email: string, username: string, lastname: string, firstname: string,
              rangemin: number, rangemax: number, params) {
    this.email = email;
    this.username = username;
    this.lastname = lastname;
    this.firstname = firstname;
    this.rangemin = rangemin;
    this.rangemax = rangemax;
    this.params = {
      enable: params.enable,
      deleted: params.delete,
      status: params.status
    }
  }



}
