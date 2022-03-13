import { Destination } from "./objects/serviceDestination/destination";
import { readCFServices, getServices, loadEnv } from "@sap/xsenv";
import getToken from "./objects/xsuaa/token";
import axios from "axios";
import { CustomLogger } from "../../logger/logger";
import { plainToClass } from "class-transformer";
loadEnv();
const services = readCFServices();

export class CloudFoundry {
  /**
   * Get the destination configuration for the given destination name
   * @param name
   * @returns {Destination}
   */
  public static async getDestination(name: string): Promise<Destination> {
    let serviceConfig = this.readConfig("destination");
    let token = await getToken(serviceConfig);
    let response = undefined;
    try {
      response = await axios({
        method: "get",
        url: `${serviceConfig.destination.uri}/destination-configuration/v1/destinations/${name}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      CustomLogger.error("Error in getting destination" + error);
    }

    const destination: Destination = plainToClass(Destination, response?.data);
    return destination;
  }

  private static readConfig(serviceName: string): any {
    return getServices({ destination: { tag: serviceName } }, services);
  }
}
