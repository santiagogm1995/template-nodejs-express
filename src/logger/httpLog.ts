export class HttpLog {
  public ip: string;
  public method: string;
  public body: any;

  constructor(ip: string, method: string, body: any) {
    this.ip = ip;
    this.method = method;
    this.body = body;
  }

  toString(): string {
    return `${this.ip} ${this.method} ${this.body}`;
  }
}
