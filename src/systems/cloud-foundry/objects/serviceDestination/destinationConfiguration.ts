import { Expose } from "class-transformer";

export class DestinationConfiguration {
  @Expose({ name: "Name" })
  public name: string;
  @Expose({ name: "URL" })
  public url: string;
  @Expose({ name: "Authentication" })
  public authentication: string;

  constructor() {
    this.name = "";
    this.url = "";
    this.authentication = "";
  }
}
