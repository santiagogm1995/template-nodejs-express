import { getServices, loadEnv, readCFServices } from "@sap/xsenv";
import { Application } from "express";
import expressBasicAuth from "express-basic-auth";
import passport from "passport";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { JWTStrategy } = require("@sap/xssec");
loadEnv();
const services = readCFServices();

export class Security {
  public static setup(app: Application, isProduction: boolean) {
    if (isProduction) {
      passport.use(
        new JWTStrategy(getServices({ uaa: { tag: "xsuaa" } }, services).uaa)
      );
      app.use(passport.initialize());
      app.use(passport.authenticate("JWT", { session: false }));
    } else {
      const pwd = process.env.ADMIN_PASSWORD || "admin";
      app.use(
        expressBasicAuth({
          challenge: true,
          users: { admin: pwd },
        })
      );
    }
  }
}
