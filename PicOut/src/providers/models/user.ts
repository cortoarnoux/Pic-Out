import { Injectable } from '@angular/core';

@Injectable()
export class User {
  private lastName: string;
  private firstName: string;
  private name: string;
  private email: string;
  private rangeMin: number;
  private rangeMax: number;

  constructor(name: string, lastName: string, firstName: string,
              email?: string, rangeMin?: number, rangeMax?: number) {
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;

    if(email) this.email = email;
    if(rangeMin) this.rangeMin = rangeMin;
    if(rangeMax) this.rangeMax = rangeMax;
  }

  public getLastName(): string { return this.lastName; }
  public getFirstName(): string { return this.firstName; }
  public getName(): string { return this.name; }
  public getEmail(): string { return this.email; }
  public getRangeMin(): number { return this.rangeMin; }
  public getRangeMax(): number { return this.rangeMax; }

  public setEmail(email: string): void { this.email = email; }
  public setRangeMin(rangeMin: number): void { this.rangeMin = rangeMin; }
  public setRangeMax(rangeMax: number): void { this.rangeMax = rangeMax; }

  public toString(): string {
    var str: string = "";
    str += "name : " + this.name;

    return str;
  }
}
