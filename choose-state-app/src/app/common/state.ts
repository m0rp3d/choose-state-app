export class State {
  number!: number;
  name!: string;
  employment!: number;
  taxes!: number;
  growth!: number;
  income!: number;
  home!: number;
  graduation!: number;
  college!: number;
  poverty!: number;
  homicide!: number;
  insurance!: number;
  climate!: number;
  rent!: number;

  constructor() {
    this.employment = 1;
    this.taxes = 1;
    this.growth = 1;
    this.income = 1;
    this.home = 1;
    this.graduation = 1;
    this.college = 1;
    this.poverty = 1;
    this.homicide = 1;
    this.insurance = 1;
    this.climate = 1;
    this.rent = 1;
  }
}
