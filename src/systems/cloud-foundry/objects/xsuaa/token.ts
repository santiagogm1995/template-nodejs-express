import { readCFServices, getServices, loadEnv } from "@sap/xsenv";
import axios from "axios";
import { stringify } from "querystring";
import { CustomLogger } from "../../../../logger/logger";
loadEnv();
const services = readCFServices();

export default async function getToken(service: any): Promise<any> {
  const auth = Buffer.from(
    service.destination.clientid + ":" + service.destination.clientsecret
  ).toString("base64");
  let xsuaaToken = null;
  const data = stringify({
    grant_type: "client_credentials",
  });

  try {
    xsuaaToken = await axios({
      method: "post",
      url: `${service.destination.url}/oauth/token`,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    });
  } catch (error) {
    CustomLogger.error("Error in getting token from xsuaa" + error);
  }

  return xsuaaToken?.data.access_token;
}
