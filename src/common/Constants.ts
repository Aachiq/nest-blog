// this approch used in spring becasue all should be inside a class
export class Constants {
  // add constructor "no strict"
  constructor() {}

  // readonly as 'final' of constant data to be used anywhere
  public static readonly CURRENT_YEAR: number = new Date().getFullYear();

  // usefull method to use anywhere
  public static getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
