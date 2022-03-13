import { Type } from "class-transformer";
import { AuthTokens } from "./authTokens";
import { DestinationConfiguration } from "./destinationConfiguration";

export class Destination {
  public destinationConfiguration: DestinationConfiguration;
  public authTokens: AuthTokens[];

  constructor() {
    this.destinationConfiguration = new DestinationConfiguration();
    this.authTokens = new Array<AuthTokens>();
  }
}
