export class ApiError {
  public status: number;
  public data: any;

  constructor (status, data) {
    this.status = status;
    this.data   = data;
  }
}
